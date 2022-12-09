import React from "react";

const error = () => {
  return (
    <div>
      <div className="error-container">
        <div className="whysign">
          <h2>Hubo un error...</h2>
          <p>
            No pudimos solicitar el cobro de tu pedido, favor intentalo mas
            tarde! Mil disculpas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default error;
