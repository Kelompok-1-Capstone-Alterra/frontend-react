// Table Head Component
function TableHead({ headers }) {
  return (
    <thead className="bg-primary-border">
      <tr className="border-b border-primary text-body-sm">
        {headers.map((header) => (
          <th
            className="py-4 px-2"
            key={header}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function getNestedValue(obj, key) {
  const keys = key.split(".");
  return keys.reduce((acc, curr) => (acc && acc[curr] ? acc[curr] : null), obj);
}

function TableRow({ data, keys }) {
  return (
    <tr className="border-b border-neutral-30">
      {keys.map((key) => (
        <td
          className="py-4 max-w-xs text-center break-all px-2"
          key={key}
        >
          {getNestedValue(data, key)}
        </td>
      ))}
    </tr>
  );
}
// Table Component
function Table({ className, headers, rows, keys }) {
  return (
    <div className="overflow-x-auto table-auto">
      <table className={className}>
        <TableHead headers={headers} />
        <tbody>
          {rows.map((row, index) => (
            <TableRow
              data={row}
              keys={keys}
              key={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
