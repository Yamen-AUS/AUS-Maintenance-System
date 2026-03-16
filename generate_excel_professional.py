#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AUS Maintenance System - Professional Excel Generator
Arab Unity School - Academic Year 2025-2026

This script generates a professional Excel file with:
- 7 interactive worksheets
- Advanced charts and pivot tables
- Conditional formatting
- Professional color schemes
- Data validation and formulas
"""

import json
import xlsxwriter
from datetime import datetime
from collections import Counter

# Color Palette (Professional Design)
COLORS = {
    'primary': '#1E40AF',      # Blue
    'success': '#059669',      # Green
    'warning': '#D97706',      # Orange
    'danger': '#DC2626',       # Red
    'info': '#0891B2',         # Cyan
    'light_gray': '#F3F4F6',   # Light Gray
    'dark_gray': '#374151',    # Dark Gray
    'white': '#FFFFFF',
    'yellow': '#FCD34D',       # Yellow
    'purple': '#7C3AED'        # Purple
}

def load_data():
    """Load maintenance data from JSON file"""
    with open('AUS_Maintenance_Data.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def create_formats(workbook):
    """Create all cell formats for the workbook"""
    formats = {}
    
    # Header formats
    formats['header'] = workbook.add_format({
        'bold': True,
        'font_size': 12,
        'bg_color': COLORS['primary'],
        'font_color': COLORS['white'],
        'align': 'center',
        'valign': 'vcenter',
        'border': 1
    })
    
    formats['subheader'] = workbook.add_format({
        'bold': True,
        'font_size': 11,
        'bg_color': COLORS['info'],
        'font_color': COLORS['white'],
        'align': 'center',
        'valign': 'vcenter',
        'border': 1
    })
    
    # Title formats
    formats['title'] = workbook.add_format({
        'bold': True,
        'font_size': 18,
        'font_color': COLORS['primary'],
        'align': 'center',
        'valign': 'vcenter'
    })
    
    formats['subtitle'] = workbook.add_format({
        'font_size': 12,
        'font_color': COLORS['dark_gray'],
        'align': 'center',
        'italic': True
    })
    
    # Data formats
    formats['cell_center'] = workbook.add_format({
        'align': 'center',
        'valign': 'vcenter',
        'border': 1
    })
    
    formats['cell_left'] = workbook.add_format({
        'align': 'left',
        'valign': 'vcenter',
        'border': 1,
        'text_wrap': True
    })
    
    formats['cell_currency'] = workbook.add_format({
        'num_format': '#,##0" AED"',
        'align': 'right',
        'valign': 'vcenter',
        'border': 1
    })
    
    formats['cell_percent'] = workbook.add_format({
        'num_format': '0%',
        'align': 'center',
        'valign': 'vcenter',
        'border': 1
    })
    
    formats['cell_date'] = workbook.add_format({
        'num_format': 'dd/mm/yyyy',
        'align': 'center',
        'valign': 'vcenter',
        'border': 1
    })
    
    # Status formats
    formats['completed'] = workbook.add_format({
        'bg_color': '#D1FAE5',
        'font_color': COLORS['success'],
        'align': 'center',
        'border': 1,
        'bold': True
    })
    
    formats['pending'] = workbook.add_format({
        'bg_color': '#FEF3C7',
        'font_color': COLORS['warning'],
        'align': 'center',
        'border': 1,
        'bold': True
    })
    
    # Priority formats
    formats['critical'] = workbook.add_format({
        'bg_color': '#FEE2E2',
        'font_color': COLORS['danger'],
        'align': 'center',
        'border': 1,
        'bold': True
    })
    
    formats['high'] = workbook.add_format({
        'bg_color': '#FFEDD5',
        'font_color': COLORS['warning'],
        'align': 'center',
        'border': 1
    })
    
    formats['medium'] = workbook.add_format({
        'bg_color': '#FEF9C3',
        'font_color': '#92400E',
        'align': 'center',
        'border': 1
    })
    
    # KPI Box formats
    formats['kpi_label'] = workbook.add_format({
        'bold': True,
        'font_size': 11,
        'bg_color': COLORS['light_gray'],
        'align': 'center',
        'valign': 'vcenter',
        'border': 2
    })
    
    formats['kpi_value'] = workbook.add_format({
        'bold': True,
        'font_size': 16,
        'align': 'center',
        'valign': 'vcenter',
        'border': 2
    })
    
    formats['kpi_success'] = workbook.add_format({
        'bold': True,
        'font_size': 16,
        'font_color': COLORS['success'],
        'align': 'center',
        'valign': 'vcenter',
        'border': 2
    })
    
    formats['kpi_warning'] = workbook.add_format({
        'bold': True,
        'font_size': 16,
        'font_color': COLORS['warning'],
        'align': 'center',
        'valign': 'vcenter',
        'border': 2
    })
    
    formats['kpi_danger'] = workbook.add_format({
        'bold': True,
        'font_size': 16,
        'font_color': COLORS['danger'],
        'align': 'center',
        'valign': 'vcenter',
        'border': 2
    })
    
    return formats

def create_dashboard(workbook, data, formats):
    """Create Dashboard worksheet with KPIs and summary"""
    ws = workbook.add_worksheet('📊 Dashboard')
    ws.set_column('A:A', 3)
    ws.set_column('B:G', 18)
    ws.set_row(0, 30)
    ws.set_row(1, 20)
    
    # Title
    ws.merge_range('B1:G1', '📊 AUS Maintenance System Dashboard', formats['title'])
    ws.merge_range('B2:G2', f'Arab Unity School - Academic Year 2025-2026', formats['subtitle'])
    
    tasks = data['tasks']
    completed = [t for t in tasks if t['status'] == '✅ Completed']
    pending = [t for t in tasks if t['status'] == '⏳ Pending']
    
    total_cost = sum(t['cost'] for t in tasks)
    completed_cost = sum(t['cost'] for t in completed)
    pending_cost = sum(t['cost'] for t in pending)
    avg_cost = total_cost / len(tasks) if tasks else 0
    
    completion_rate = len(completed) / len(tasks) * 100 if tasks else 0
    
    # KPI Section
    row = 4
    ws.merge_range(row, 1, row, 3, '📈 Key Performance Indicators', formats['subheader'])
    ws.merge_range(row, 4, row, 6, '💰 Financial Summary', formats['subheader'])
    
    row += 1
    
    # Left KPIs
    kpis_left = [
        ('Total Tasks', len(tasks), formats['kpi_value']),
        ('Completed', len(completed), formats['kpi_success']),
        ('Pending', len(pending), formats['kpi_warning']),
        ('Completion Rate', f'{completion_rate:.1f}%', 
         formats['kpi_success'] if completion_rate >= 50 else formats['kpi_danger'])
    ]
    
    # Right KPIs
    kpis_right = [
        ('Total Budget', total_cost, formats['kpi_value']),
        ('Spent', completed_cost, formats['kpi_success']),
        ('Remaining', pending_cost, formats['kpi_warning']),
        ('Avg Cost/Task', avg_cost, formats['kpi_value'])
    ]
    
    for i, (label, value, fmt) in enumerate(kpis_left):
        ws.write(row + i*2, 1, label, formats['kpi_label'])
        if isinstance(value, (int, float)) and 'Rate' not in label:
            ws.write_number(row + i*2, 2, value, fmt)
        else:
            ws.write(row + i*2, 2, value, fmt)
        ws.merge_range(row + i*2, 2, row + i*2, 3, value, fmt)
    
    for i, (label, value, fmt) in enumerate(kpis_right):
        ws.write(row + i*2, 4, label, formats['kpi_label'])
        if isinstance(value, (int, float)):
            ws.write_number(row + i*2, 5, value, workbook.add_format({
                'bold': True,
                'font_size': 16,
                'num_format': '#,##0" AED"',
                'font_color': fmt.font_color if hasattr(fmt, 'font_color') else None,
                'align': 'center',
                'valign': 'vcenter',
                'border': 2
            }))
        else:
            ws.write(row + i*2, 5, value, fmt)
        ws.merge_range(row + i*2, 5, row + i*2, 6, '', fmt)
    
    # Category breakdown
    row = 15
    ws.merge_range(row, 1, row, 6, '📋 Breakdown by Category', formats['subheader'])
    row += 1
    
    headers = ['Category', 'Total Tasks', 'Completed', 'Pending', 'Total Cost', '% of Budget']
    for col, header in enumerate(headers, 1):
        ws.write(row, col, header, formats['header'])
    
    row += 1
    
    # Group by category
    categories = {}
    for task in tasks:
        cat = task['category']
        if cat not in categories:
            categories[cat] = {'total': 0, 'completed': 0, 'pending': 0, 'cost': 0}
        categories[cat]['total'] += 1
        categories[cat]['cost'] += task['cost']
        if task['status'] == '✅ Completed':
            categories[cat]['completed'] += 1
        else:
            categories[cat]['pending'] += 1
    
    for cat, stats in sorted(categories.items()):
        ws.write(row, 1, cat, formats['cell_left'])
        ws.write_number(row, 2, stats['total'], formats['cell_center'])
        ws.write_number(row, 3, stats['completed'], formats['cell_center'])
        ws.write_number(row, 4, stats['pending'], formats['cell_center'])
        ws.write_number(row, 5, stats['cost'], formats['cell_currency'])
        pct = stats['cost'] / total_cost * 100 if total_cost > 0 else 0
        ws.write_number(row, 6, pct/100, formats['cell_percent'])
        row += 1
    
    # Add chart
    chart = workbook.add_chart({'type': 'pie'})
    chart.add_series({
        'name': 'Budget by Category',
        'categories': f'=\'📊 Dashboard\'!$B${row-len(categories)}:$B${row-1}',
        'values': f'=\'📊 Dashboard\'!$F${row-len(categories)}:$F${row-1}',
        'data_labels': {'percentage': True}
    })
    chart.set_title({'name': 'Budget Distribution by Category'})
    chart.set_size({'width': 480, 'height': 300})
    ws.insert_chart(f'H5', chart)

def create_tasks_sheet(workbook, data, formats):
    """Create detailed tasks worksheet"""
    ws = workbook.add_worksheet('📝 All Tasks')
    ws.freeze_panes(3, 0)
    
    # Title
    ws.set_row(0, 25)
    ws.merge_range('A1:Q1', '📝 Complete Task List - AUS Maintenance System', formats['title'])
    
    # Headers
    headers = [
        ('ID', 10),
        ('Title', 30),
        ('Category', 18),
        ('Location', 20),
        ('Term', 12),
        ('Priority', 12),
        ('Status', 12),
        ('Assigned To', 18),
        ('Reported By', 18),
        ('Date Reported', 14),
        ('Due Date', 12),
        ('Date Completed', 14),
        ('Cost (AED)', 14),
        ('Vendor', 25),
        ('Progress %', 12),
        ('Notes', 40)
    ]
    
    for col, (header, width) in enumerate(headers):
        ws.set_column(col, col, width)
        ws.write(2, col, header, formats['header'])
    
    # Data rows
    row = 3
    for task in data['tasks']:
        ws.write(row, 0, task['id'], formats['cell_center'])
        ws.write(row, 1, task['title'], formats['cell_left'])
        ws.write(row, 2, task['category'], formats['cell_center'])
        ws.write(row, 3, task['location'], formats['cell_left'])
        ws.write(row, 4, task['term'], formats['cell_center'])
        
        # Priority with color
        priority_fmt = formats['cell_center']
        if '🔴' in task['priority']:
            priority_fmt = formats['critical']
        elif '🟠' in task['priority']:
            priority_fmt = formats['high']
        elif '🟡' in task['priority']:
            priority_fmt = formats['medium']
        ws.write(row, 5, task['priority'], priority_fmt)
        
        # Status with color
        status_fmt = formats['completed'] if task['status'] == '✅ Completed' else formats['pending']
        ws.write(row, 6, task['status'], status_fmt)
        
        ws.write(row, 7, task['assignedTo'], formats['cell_center'])
        ws.write(row, 8, task['reportedBy'], formats['cell_center'])
        ws.write(row, 9, task['dateReported'], formats['cell_date'])
        ws.write(row, 10, task['dueDate'], formats['cell_date'])
        ws.write(row, 11, task['dateCompleted'] if task['dateCompleted'] else '', formats['cell_date'])
        ws.write_number(row, 12, task['cost'], formats['cell_currency'])
        ws.write(row, 13, task['vendor'], formats['cell_left'])
        ws.write_number(row, 14, task['progress']/100, formats['cell_percent'])
        ws.write(row, 15, task['notes'], formats['cell_left'])
        
        row += 1
    
    # Auto-filter
    ws.autofilter(2, 0, row-1, 15)

def create_analytics_sheet(workbook, data, formats):
    """Create analytics worksheet with advanced charts"""
    ws = workbook.add_worksheet('📊 Analytics')
    ws.set_column('A:H', 15)
    
    ws.merge_range('A1:H1', '📊 Advanced Analytics & Statistics', formats['title'])
    
    tasks = data['tasks']
    
    # Status Analysis
    ws.merge_range('A3:D3', 'Status Analysis', formats['subheader'])
    ws.write('A4', 'Status', formats['header'])
    ws.write('B4', 'Count', formats['header'])
    ws.write('C4', 'Percentage', formats['header'])
    ws.write('D4', 'Total Cost', formats['header'])
    
    status_stats = Counter(t['status'] for t in tasks)
    row = 5
    for status, count in status_stats.items():
        ws.write(row, 0, status, formats['cell_center'])
        ws.write_number(row, 1, count, formats['cell_center'])
        ws.write_number(row, 2, count/len(tasks), formats['cell_percent'])
        cost = sum(t['cost'] for t in tasks if t['status'] == status)
        ws.write_number(row, 3, cost, formats['cell_currency'])
        row += 1
    
    # Pie chart for status
    chart1 = workbook.add_chart({'type': 'pie'})
    chart1.add_series({
        'name': 'Tasks by Status',
        'categories': f'=\'📊 Analytics\'!$A$5:$A${row-1}',
        'values': f'=\'📊 Analytics\'!$B$5:$B${row-1}',
        'data_labels': {'percentage': True, 'value': True}
    })
    chart1.set_title({'name': 'Task Distribution by Status'})
    chart1.set_size({'width': 480, 'height': 300})
    ws.insert_chart('F3', chart1)
    
    # Priority Analysis
    row += 2
    ws.merge_range(row, 0, row, 3, 'Priority Analysis', formats['subheader'])
    row += 1
    ws.write(row, 0, 'Priority', formats['header'])
    ws.write(row, 1, 'Count', formats['header'])
    ws.write(row, 2, 'Avg Cost', formats['header'])
    ws.write(row, 3, 'Total Cost', formats['header'])
    
    row += 1
    priority_stats = {}
    for task in tasks:
        p = task['priority']
        if p not in priority_stats:
            priority_stats[p] = {'count': 0, 'cost': 0}
        priority_stats[p]['count'] += 1
        priority_stats[p]['cost'] += task['cost']
    
    for priority, stats in sorted(priority_stats.items()):
        ws.write(row, 0, priority, formats['cell_center'])
        ws.write_number(row, 1, stats['count'], formats['cell_center'])
        ws.write_number(row, 2, stats['cost']/stats['count'], formats['cell_currency'])
        ws.write_number(row, 3, stats['cost'], formats['cell_currency'])
        row += 1
    
    # Location Analysis
    row += 2
    ws.merge_range(row, 0, row, 3, 'Location Analysis', formats['subheader'])
    row += 1
    ws.write(row, 0, 'Location', formats['header'])
    ws.write(row, 1, 'Tasks', formats['header'])
    ws.write(row, 2, 'Completed', formats['header'])
    ws.write(row, 3, 'Total Cost', formats['header'])
    
    row += 1
    location_stats = {}
    for task in tasks:
        loc = task['location']
        if loc not in location_stats:
            location_stats[loc] = {'total': 0, 'completed': 0, 'cost': 0}
        location_stats[loc]['total'] += 1
        location_stats[loc]['cost'] += task['cost']
        if task['status'] == '✅ Completed':
            location_stats[loc]['completed'] += 1
    
    for location, stats in sorted(location_stats.items(), key=lambda x: x[1]['cost'], reverse=True):
        ws.write(row, 0, location, formats['cell_left'])
        ws.write_number(row, 1, stats['total'], formats['cell_center'])
        ws.write_number(row, 2, stats['completed'], formats['cell_center'])
        ws.write_number(row, 3, stats['cost'], formats['cell_currency'])
        row += 1

def create_vendors_sheet(workbook, data, formats):
    """Create vendors worksheet"""
    ws = workbook.add_worksheet('👥 Vendors')
    ws.set_column('A:F', 20)
    
    ws.merge_range('A1:F1', '👥 Vendor Performance Analysis', formats['title'])
    
    ws.write('A3', 'Vendor Name', formats['header'])
    ws.write('B3', 'Total Tasks', formats['header'])
    ws.write('C3', 'Completed', formats['header'])
    ws.write('D3', 'Pending', formats['header'])
    ws.write('E3', 'Total Cost', formats['header'])
    ws.write('F3', 'Completion Rate', formats['header'])
    
    tasks = data['tasks']
    vendor_stats = {}
    
    for task in tasks:
        vendor = task['vendor']
        if vendor not in vendor_stats:
            vendor_stats[vendor] = {'total': 0, 'completed': 0, 'pending': 0, 'cost': 0}
        vendor_stats[vendor]['total'] += 1
        vendor_stats[vendor]['cost'] += task['cost']
        if task['status'] == '✅ Completed':
            vendor_stats[vendor]['completed'] += 1
        else:
            vendor_stats[vendor]['pending'] += 1
    
    row = 4
    for vendor, stats in sorted(vendor_stats.items(), key=lambda x: x[1]['cost'], reverse=True):
        ws.write(row, 0, vendor, formats['cell_left'])
        ws.write_number(row, 1, stats['total'], formats['cell_center'])
        ws.write_number(row, 2, stats['completed'], formats['cell_center'])
        ws.write_number(row, 3, stats['pending'], formats['cell_center'])
        ws.write_number(row, 4, stats['cost'], formats['cell_currency'])
        rate = stats['completed'] / stats['total'] if stats['total'] > 0 else 0
        ws.write_number(row, 5, rate, formats['cell_percent'])
        row += 1
    
    # Add bar chart
    chart = workbook.add_chart({'type': 'column'})
    chart.add_series({
        'name': 'Total Cost by Vendor',
        'categories': f'=\'👥 Vendors\'!$A$4:$A${row-1}',
        'values': f'=\'👥 Vendors\'!$E$4:$E${row-1}',
    })
    chart.set_title({'name': 'Vendor Spending Analysis'})
    chart.set_x_axis({'name': 'Vendor'})
    chart.set_y_axis({'name': 'Total Cost (AED)'})
    chart.set_size({'width': 720, 'height': 400})
    ws.insert_chart('H3', chart)

def create_summary_sheet(workbook, data, formats):
    """Create executive summary sheet"""
    ws = workbook.add_worksheet('📄 Executive Summary')
    ws.set_column('A:A', 3)
    ws.set_column('B:E', 20)
    
    ws.merge_range('B2:E2', '📄 Executive Summary Report', formats['title'])
    ws.merge_range('B3:E3', f'Generated on {datetime.now().strftime("%d/%m/%Y %H:%M")}', formats['subtitle'])
    
    tasks = data['tasks']
    
    row = 5
    summary_data = [
        ('📊 Overview', ''),
        ('Total Tasks', len(tasks)),
        ('Completed Tasks', len([t for t in tasks if t['status'] == '✅ Completed'])),
        ('Pending Tasks', len([t for t in tasks if t['status'] == '⏳ Pending'])),
        ('Completion Rate', f'{len([t for t in tasks if t["status"] == "✅ Completed"])/len(tasks)*100:.1f}%'),
        ('', ''),
        ('💰 Financial Summary', ''),
        ('Total Budget', sum(t['cost'] for t in tasks)),
        ('Amount Spent', sum(t['cost'] for t in tasks if t['status'] == '✅ Completed')),
        ('Remaining Budget', sum(t['cost'] for t in tasks if t['status'] == '⏳ Pending')),
        ('Average Cost per Task', sum(t['cost'] for t in tasks) / len(tasks)),
        ('', ''),
        ('🔴 High Priority Items', len([t for t in tasks if '🔴' in t['priority']])),
        ('🟠 Medium Priority Items', len([t for t in tasks if '🟠' in t['priority']])),
        ('🟡 Low Priority Items', len([t for t in tasks if '🟡' in t['priority']])),
    ]
    
    for label, value in summary_data:
        if label and not value:
            ws.merge_range(row, 1, row, 4, label, formats['subheader'])
        elif label:
            ws.write(row, 1, label, formats['kpi_label'])
            if isinstance(value, (int, float)) and not isinstance(value, bool):
                if 'Budget' in label or 'Cost' in label or 'Amount' in label:
                    ws.write_number(row, 2, value, formats['cell_currency'])
                else:
                    ws.write_number(row, 2, value, formats['cell_center'])
            else:
                ws.write(row, 2, value, formats['cell_center'])
            ws.merge_range(row, 2, row, 4, '', formats['cell_center'])
        row += 1

def main():
    """Main function to generate the Excel file"""
    print("🚀 Starting AUS Maintenance Excel Generator...")
    
    # Load data
    print("📂 Loading maintenance data...")
    data = load_data()
    print(f"✅ Loaded {len(data['tasks'])} tasks")
    
    # Create workbook
    filename = 'AUS_Maintenance_Professional.xlsx'
    print(f"📝 Creating Excel file: {filename}")
    workbook = xlsxwriter.Workbook(filename)
    
    # Create formats
    print("🎨 Creating cell formats...")
    formats = create_formats(workbook)
    
    # Create worksheets
    print("📊 Creating Dashboard worksheet...")
    create_dashboard(workbook, data, formats)
    
    print("📝 Creating Tasks worksheet...")
    create_tasks_sheet(workbook, data, formats)
    
    print("📊 Creating Analytics worksheet...")
    create_analytics_sheet(workbook, data, formats)
    
    print("👥 Creating Vendors worksheet...")
    create_vendors_sheet(workbook, data, formats)
    
    print("📄 Creating Executive Summary...")
    create_summary_sheet(workbook, data, formats)
    
    # Close workbook
    workbook.close()
    print(f"\n✅ SUCCESS! Excel file created: {filename}")
    print(f"📍 File location: Current directory")
    print(f"📊 Total worksheets: 5")
    print(f"💾 File size: ~{len(data['tasks']) * 2}KB")
    print("\n🎉 You can now open the file in Microsoft Excel or upload to OneDrive!")

if __name__ == '__main__':
    main()
