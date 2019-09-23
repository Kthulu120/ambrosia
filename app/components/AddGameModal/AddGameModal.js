

default export () => (
  <details className="details-reset details-with-dialog">
  <summary>
    <i className="fas fa-plus mr-1" />
    Add Game
  </summary>
  <details-dialog className="details-dialog anim-fade-in fast wide" aria-label="Dialog" role="dialog" aria-modal="true" tabindex="-1">
    <div className="Box d-flex flex-column text-gray-dark">
      <div className="Box-header">
        Add Game or Game Lbrary
      </div>
      <div className="Box-body d-flex flex-column">
        <form>
          <AsyncSelect cacheOptions loadOptions={this.searchGameFromTitle}></AsyncSelect>
          <div className="d-flex mt-2 flex-justify-around">
            <input type="text" onChange={this.handleGameExecutable} type="file" name="gameExecutable" />
            <select onChange={this.handleLauncher}>
              {Object.keys(launchers).map((launcher) => <option key={launcher} value={launcher}>{launcher}</option>)}
            </select>
          </div>

        </form>
      </div>
      <div className="Box-footer d-flex flex-justify-around">
        <button className="btn" onClick={this.handleAddGame}>Submit</button>
        <button type="button" className="btn" data-close-dialog="">Close</button>
      </div>
    </div>
  </details-dialog>
</details>
)
