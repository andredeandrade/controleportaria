import { REPORT_MODULES } from './reportDefs'
import { fetchReportPage } from './service'
import type { ReportFormat, ReportModuleKey, ReportsPeriodFilter } from '@/types/relatorios'

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

async function buildPdf(title: string, columns: string[], rows: string[][]): Promise<void> {
  const { jsPDF } = await import('jspdf')
  const autoTable = (await import('jspdf-autotable')).default

  const doc = new jsPDF({ orientation: 'landscape' })

  doc.setFontSize(14)
  doc.text(title, 14, 16)
  doc.setFontSize(9)
  doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 14, 22)

  autoTable(doc, {
    startY: 28,
    head: [columns],
    body: rows,
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [37, 99, 235] },
  })

  doc.save(`${title.toLowerCase().replace(/\s+/g, '-')}.pdf`)
}

function csvEscapeField(value: string): string {
  if (/[";\n,]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`
  }

  return value
}

function buildCsv(title: string, columns: string[], rows: string[][]): void {
  const lines = [columns, ...rows].map((line) => line.map(csvEscapeField).join(';'))
  const csvContent = '﻿' + lines.join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = `${title.toLowerCase().replace(/\s+/g, '-')}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

async function buildXlsx(title: string, columns: string[], rows: string[][]): Promise<void> {
  const XLSX = await import('xlsx')

  const worksheet = XLSX.utils.aoa_to_sheet([columns, ...rows])
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, title.slice(0, 31))

  const slug = title.toLowerCase().replace(/\s+/g, '-')
  XLSX.writeFile(workbook, `${slug}.xlsx`)
}

export async function exportReport(
  moduleKey: ReportModuleKey,
  format: ReportFormat,
  filter: ReportsPeriodFilter,
): Promise<void> {
  const def = REPORT_MODULES[moduleKey]
  const items = await fetchAllPages<unknown>(def.bffPath, paramsFromFilter(filter))
  const rows = items.map((item) => def.mapRow(item))

  if (format === 'CSV') {
    buildCsv(def.label, def.columns, rows)
    return
  }

  if (format === 'XLSX') {
    await buildXlsx(def.label, def.columns, rows)
    return
  }

  await buildPdf(def.label, def.columns, rows)
}

/**
 * Exporta todos os módulos de relatório em sequência, um por vez, para evitar
 * disparar vários downloads simultâneos e sobrecarregar o browser.
 */
export async function exportAllReports(
  format: ReportFormat,
  filter: ReportsPeriodFilter,
): Promise<void> {
  for (const moduleKey of Object.keys(REPORT_MODULES) as ReportModuleKey[]) {
    await exportReport(moduleKey, format, filter)
  }
}
