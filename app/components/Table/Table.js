import { useTable, useSortBy } from 'react-table'





export default function Table() {
  const data = React.useMemo( () => [{title: "dcn", name: "klfndklfdnl", launcher_name: "PC",}])
  const columns =  React.useMemo(() => [{Header: 'title', accessor: 'title'}, {Header: 'Launcher', accessor: 'launcher_name'}])
  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  )

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
        </thead>
        <tbody>
          {firstPageRows.map(
            (row, i) =>
              prepareRow(row) || (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
              )
          )}
        </tbody>
      </table>
      <br />
    </div>
  );
}
