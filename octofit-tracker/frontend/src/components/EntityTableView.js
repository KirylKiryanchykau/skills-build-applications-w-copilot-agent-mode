import { useMemo, useState } from 'react';

function toDisplayText(value) {
  if (value === null || value === undefined || value === '') {
    return 'N/A';
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
}

function EntityTableView({
  title,
  description,
  docsHref,
  loading,
  error,
  items,
  primaryKeys = ['name', 'title', 'username'],
}) {
  const [searchText, setSearchText] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const columns = useMemo(() => {
    const keys = new Set();

    items.forEach((item) => {
      Object.keys(item || {}).forEach((key) => keys.add(key));
    });

    const visibleKeys = [...keys].filter((key) => !['_id', 'id'].includes(key));
    return visibleKeys.slice(0, 5);
  }, [items]);

  const filteredItems = useMemo(() => {
    if (!searchText.trim()) {
      return items;
    }

    const lowered = searchText.toLowerCase();
    return items.filter((item) => JSON.stringify(item).toLowerCase().includes(lowered));
  }, [items, searchText]);

  const getPrimaryValue = (item) => {
    for (const key of primaryKeys) {
      if (item?.[key]) {
        return item[key];
      }
    }

    return item?.id || item?._id || 'Record';
  };

  return (
    <section>
      <div className="card dashboard-card rounded-4 border-0">
        <div className="card-body p-4">
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3 mb-4">
            <div>
              <h2 className="h3 mb-1">{title}</h2>
              <p className="text-secondary mb-0">{description}</p>
            </div>
            <a className="btn btn-outline-primary" href={docsHref} target="_blank" rel="noreferrer">
              Open API Docs
            </a>
          </div>

          <form className="row g-3 mb-3" onSubmit={(event) => event.preventDefault()}>
            <div className="col-sm-9 col-md-10">
              <label htmlFor={`${title}-search`} className="form-label">
                Search {title}
              </label>
              <input
                id={`${title}-search`}
                type="search"
                className="form-control"
                placeholder={`Filter ${title.toLowerCase()} by any field`}
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
              />
            </div>
            <div className="col-sm-3 col-md-2 d-flex align-items-end">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={() => setSearchText('')}
                disabled={!searchText}
              >
                Clear
              </button>
            </div>
          </form>

          {loading && <div className="alert alert-info mb-0">Loading {title.toLowerCase()}...</div>}
          {error && !loading && <div className="alert alert-danger mb-0">{error}</div>}

          {!loading && !error && (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col" style={{ minWidth: '64px' }}>
                      #
                    </th>
                    <th scope="col">Name</th>
                    {columns.map((column) => (
                      <th key={column} scope="col">
                        {column}
                      </th>
                    ))}
                    <th scope="col" className="text-end">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.length === 0 && (
                    <tr>
                      <td colSpan={columns.length + 3} className="text-center py-4 text-secondary">
                        No records found.
                      </td>
                    </tr>
                  )}
                  {filteredItems.map((item, index) => (
                    <tr key={item.id || item._id || `${title}-${index}`}>
                      <td>{index + 1}</td>
                      <td className="fw-semibold">{toDisplayText(getPrimaryValue(item))}</td>
                      {columns.map((column) => (
                        <td key={`${item.id || item._id || index}-${column}`}>{toDisplayText(item[column])}</td>
                      ))}
                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          data-bs-toggle="modal"
                          data-bs-target="#recordDetailModal"
                          onClick={() => setSelectedItem(item)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="modal fade" id="recordDetailModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title} Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <pre className="bg-light rounded p-3 mb-0">{JSON.stringify(selectedItem, null, 2)}</pre>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EntityTableView;
