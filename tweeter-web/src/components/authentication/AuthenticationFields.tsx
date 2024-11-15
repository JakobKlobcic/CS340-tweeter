import React, { useState } from "react";

const AuthenticationFields = ( {onKeyDown, setAlias, setPassword}: {onKeyDown:any, setAlias: any, setPassword: any}) => {

    return (
        <>
        <div className="form-floating">
          <input
            type="text"
            aria-label="alias"
            className="form-control"
            size={50}
            id="aliasInput"
            placeholder="name@example.com"
            onKeyDown={onKeyDown}
            onChange={(event) => setAlias(event.target.value)}
          />
          <label htmlFor="aliasInput">Alias</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            aria-label="password"
            className="form-control bottom"
            id="passwordInput"
            placeholder="Password"
            onKeyDown={onKeyDown}
            onChange={(event) => setPassword(event.target.value)}
          />
          <label htmlFor="passwordInput">Password</label>
        </div>
        </>
    );
}
export default AuthenticationFields;