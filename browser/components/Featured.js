import React from 'react';

export default function Featured() {
  return (
      <div className="container">
      <div className="row  mt-4">
        <div className="col-md-4">
          <h2>Impossible Artifacts</h2>
          <p>Defy odds and earn yourself the extra hand(s). Shrowded in mystery, select from our harnessed collection of the rarest treasures on this plane and the next.</p>
          <p><a className="btn btn-warning" href="#" role="button">Shop Artifacts &raquo;</a></p>
        </div>
        <div className="col-md-4">
          <h2>Marvelous Garbs</h2>
          <p>You wouldn't be caught on the job without sporting the proper protective and prgamatic attire! Whether you need to blend into the shadows or be as conspicuous as a web-slinging hero himself, we have something in store for you.</p>
          <p><a className="btn btn-warning" href="#" role="button">Shop Garbs &raquo;</a></p>
        </div>
        <div className="col-md-4">
          <h2>Extrordinary Estates</h2>
          <p>Home is where the hearth is. Find the perfect dwelling in our selection of estates, stacked dungeon to ceiling with full ammedities, protective enchantments, rich -and often curious- history.</p>
          <p><a className="btn btn-warning" href="#" role="button">Shop Estates &raquo;</a></p>
        </div>
      </div>
    </div>
  )
}
