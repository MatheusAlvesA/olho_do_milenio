import React, { Component } from 'react';
import "./App.css"

class App extends Component {

	state = {
		busca: '',
		notFound: false,
		dados: []
	}

	getCartas = async busca => {
		const conf = {
						method: 'GET',
						mode: 'cors',
						cache: 'default'
					};
		const r = await fetch(`https://cors-anywhere.herokuapp.com/http://api.olhodomilenio.matheusalves.com.br/cards?nome=${busca}&query_size=20`, conf);
		return (await r.json()).results;
	}

	sincronizando = false;
	sincronizar = async () => {
		if(this.sincronizando)
			return;
		this.sincronizando = true;

		const { busca } = this.state;
		try {
			const dados = await this.getCartas(busca);
			if(dados.length <= 0)
				this.setState({notFound: true}, () => {
					this.sincronizando = false;
				});
			else
				this.setState({dados}, () => {
					this.sincronizando = false;
				});
		} catch {
			this.sincronizando = false;
		}
	}

	queuedSync = null;
	handleChange = busca => {
		this.setState({busca, dados: [], notFound: false}, () => {
			if(this.queuedSync !== null)
				clearInterval(this.queuedSync);
			this.queuedSync = setTimeout(() => {
				this.queuedSync = null;
				this.sincronizar();
			}, 1000);
		});
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-12 col-md-8 offset-md-2">
						{(
							(this.state.busca.length > 0)
							? this.getResultsScreen()
							: this.getDefaultScreen()
						)}
					</div>
				</div>
			</div>
		);
	}

	getResultsScreen() {
		setTimeout(() => document.getElementById('busca').focus(), 1);
		return <div 
					className="d-flex flex-column justify-content-between align-items-center"
					style={{height: '100vh'}}
				>
				<div
					className="d-flex justify-content-center align-items-center w-100 mt-3 mb-5"
					style={{height: '10%'}}
				>
				<img
					src={require("./olho.png")}
					alt="logo"
					height="100%"
				/>
				<div
					className="w-100 h-100 ml-3"
				>
					<input
						style={{
							textAlign: 'center',
							padding: "10px",
							fontSize: "20px",
							borderRadius: '20px'
						}}
						id="busca"
						type="text"
						value={this.state.busca}
						onChange={e => this.handleChange(e.target.value)}
						className="form-control"
						placeholder="Buscar"
					/>
				</div>
		</div>
		<div
			style={{
					height: '90%',
					width: '100%',
					overflowY: 'scroll'
				}}
		>
			{
				(this.state.notFound)
				? <h2>Nada encontrado :(</h2>
				: (
					(this.state.dados.length > 0)
					? this.state.dados.map(this.getCard)
					: <img src={require('./loading.gif')} alt="Loading" />
				)
			}
		</div>
		</div>;
	}

	getDefaultScreen() {
		setTimeout(() => document.getElementById('busca').focus(), 1);
		return (<div
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
						id="busca"
						type="text"
						value={this.state.busca}
						onChange={e => this.handleChange(e.target.value)}
						className="form-control"
						placeholder="Buscar"
					/>
					
				</div>
		</div>);
	}

	getCard(infos) {
		return <div
					key={infos.id}
					className="w-100 d-flex carta"
					onClick={() => window.open(infos.url_carta, '_blank')}
				>
					<img
						src={infos.url_imagem_carta}
						alt="Imagem Carta"
						height="100%"
						style={{ float: 'left' }}
					/>
					<div
						style={{
							width: "50%",
							height: "100%",
							marginLeft: "20px",
							wordBreak: "break-all"
						}}
					>
						<h4>{infos.titulo}<br /><span className="text-muted">{infos.estoque}</span> </h4>
					</div>
					<div
						className="d-flex flex-column justify-content-around align-items-center"
						style={{
								width: "20%",
								height: "100%",
						}}
					>
						<h4
							style={{
								textAlign: 'right',
								color: 'seagreen'
							}}
						>
							R${infos.preco}
						</h4>
					</div>
		</div>;
	}
}

export default App;
