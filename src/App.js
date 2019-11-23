import React from 'react';

function App() {
  return (
    <div className="container-fluid">
		<div className="row">
			<div className="col-12 col-md-8 offset-md-2">
				<div
					className="d-flex flex-column justify-content-center align-items-center"
					style={{height: '100vh'}}
				>
					<img
						src={require("./olho.png")}
						alt="logo"
						width="30%"
					/>
					<div
						className="form-group w-100 h-20 mt-3"
					>
						<input
							style={{
								textAlign: 'center',
								padding: "10px",
								fontSize: "20px",
								borderRadius: '20px'
							}}
							type="text"
							className="form-control"
							placeholder="Buscar"
						/>
					</div>
				</div>
			</div>
		</div>
    </div>
  );
}

export default App;
