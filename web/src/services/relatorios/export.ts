import { REPORT_MODULES } from './reportDefs'
import { fetchReportPage } from './service'
import type { ReportModuleKey, ReportsPeriodFilter } from '@/types/relatorios'

type ReportSection = {
  title: string
  columns: string[]
  rows: string[][]
}

async function fetchAllPages<T>(path: string, params?: URLSearchParams): Promise<T[]> {
  const allItems: T[] = []
  let page = 1
  const pageSize = 100

  do {
    const p = new URLSearchParams(params)
    p.set('page', String(page))
    p.set('pageSize', String(pageSize))

    const result = await fetchReportPage<T>(path, p)
    allItems.push(...result.items)

    if (page >= result.pagination.totalPages) break
    page++
  } while (true)

  return allItems
}

/**
 * Monta os parâmetros de período (from/to) para envio à API de relatórios.
 * Sem `from`/`to` preenchidos, nenhum filtro é aplicado (todos os registros).
 */
function paramsFromFilter(filter: ReportsPeriodFilter): URLSearchParams {
  const params = new URLSearchParams()

  if (filter.from && filter.to) {
    params.set('from', filter.from)
    params.set('to', filter.to)
  }

  return params
}

function addPdfSection(
  doc: import('jspdf').jsPDF,
  autoTable: (typeof import('jspdf-autotable'))['default'],
  section: ReportSection,
): void {
  doc.setFontSize(14)
  doc.text(section.title, 14, 16)
  doc.setFontSize(9)
  doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 14, 22)

  autoTable(doc, {
    startY: 28,
    head: [section.columns],
    body: section.rows,
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [37, 99, 235] },
  })
}

async function buildPdf(section: ReportSection): Promise<void> {
  const { jsPDF } = await import('jspdf')
  const autoTable = (await import('jspdf-autotable')).default

  const doc = new jsPDF({ orientation: 'landscape' })
  addPdfSection(doc, autoTable, section)

  doc.save(`${section.title.toLowerCase().replace(/\s+/g, '-')}.pdf`)
}

/**
 * Gera um único PDF com uma seção (título + tabela) por módulo, evitando disparar
 * vários downloads separados de uma vez — o que navegadores bloqueiam silenciosamente
 * a partir do segundo arquivo automático.
 */
async function buildCombinedPdf(sections: ReportSection[]): Promise<void> {
  const { jsPDF } = await import('jspdf')
  const autoTable = (await import('jspdf-autotable')).default

  const doc = new jsPDF({ orientation: 'landscape' })

  sections.forEach((section, index) => {
    if (index > 0) doc.addPage()
    addPdfSection(doc, autoTable, section)
  })

  doc.save('relatorios-geral.pdf')
}

async function fetchReportSection(moduleKey: ReportModuleKey, filter: ReportsPeriodFilter) {
  const def = REPORT_MODULES[moduleKey]
  const items = await fetchAllPages<unknown>(def.bffPath, paramsFromFilter(filter))

  return { title: def.label, columns: def.columns, rows: items.map((item) => def.mapRow(item)) }
}

export async function exportReport(
  moduleKey: ReportModuleKey,
  filter: ReportsPeriodFilter,
): Promise<void> {
  const section = await fetchReportSection(moduleKey, filter)
  await buildPdf(section)
}

/**
 * Exporta todos os módulos de relatório em um único PDF (uma seção por módulo),
 * gerando um só download em vez de um por módulo.
 */
export async function exportAllReports(filter: ReportsPeriodFilter): Promise<void> {
  const sections: ReportSection[] = []

  for (const moduleKey of Object.keys(REPORT_MODULES) as ReportModuleKey[]) {
    sections.push(await fetchReportSection(moduleKey, filter))
  }

  await buildCombinedPdf(sections)
}
