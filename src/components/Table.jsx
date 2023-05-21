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

// Table Component
function Table({ headers, className, children }) {
  return (
    <table className={`${className}`}>
      <TableHead headers={headers} />
      <tbody>{children}</tbody>
    </table>
  );
}

export default Table;
