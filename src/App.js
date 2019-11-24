import React, { Component } from 'react';
import "./App.css"

class App extends Component {

	state = {
		busca: '',
		dados: []
	}

	getCartas = async busca => {
		return [{
			titulo: 'The Winged Dragon of Ra',
			codigo: 'LC01-EN003',
			url_imagem_carta: 'https://www.solosagrado.com.br/images/produtos/w200/h292/19318.jpg', 
			data_hora_inserido: '2019/11/24',
			mais_recente: true,
			url_carta: 'https://www.solosagrado.com.br/Yugioh-Cards/19318/The-Winged-Dragon-of-Ra-LC01-EN003'
		},{
			titulo: 'Stardust Dragon',
			codigo: 'SHSP-ENSE1',
			url_imagem_carta: 'https://www.solosagrado.com.br/images/produtos/w200/h292/29217.jpg', 
			data_hora_inserido: '2019/11/24',
			mais_recente: true,
			url_carta: 'https://www.solosagrado.com.br/Yugioh-Cards/29217/Stardust-Dragon-SHSP-ENSE1'
		},{
			titulo: 'Black Luster Soldier - Envoy of the Beginning',
			codigo: 'CT10-EN005',
			url_imagem_carta: 'https://www.solosagrado.com.br/images/produtos/w200/h292/28304.jpg', 
			data_hora_inserido: '2019/11/24',
			mais_recente: true,
			url_carta: 'https://www.solosagrado.com.br/Yugioh-Cards/28304/Black-Luster-Soldier---Envoy-of-the-Beginning-CT10-EN005'
		},{
			titulo: 'The Seal of Orichalcos',
			codigo: 'LC03-EN001',
			url_imagem_carta: 'https://www.solosagrado.com.br/images/produtos/w200/h292/24545.jpg', 
			data_hora_inserido: '2019/11/24',
			mais_recente: true,
			url_carta: 'https://www.solosagrado.com.br/Yugioh-Cards/24545/The-Seal-of-Orichalcos-LC03-EN001-'
		},{
			titulo: 'Blue-Eyes White Dragon',
			codigo: 'SDK-001',
			url_imagem_carta: 'https://www.solosagrado.com.br/images/produtos/w200/h292/2184.jpg', 
			data_hora_inserido: '2019/11/24',
			mais_recente: true,
			url_carta: 'https://www.solosagrado.com.br/Yugioh-Cards/2184/Blue-Eyes-White-Dragon-SDK-001'
		}]
	}

	sincronizando = false;
	sincronizar = () => {
		if(this.sincronizando)
			return;
		this.sincronizando = true;
		return new Promise((res, rej) => {
			const { busca } = this.state;
			this.setState({dados: []}, async () => {
				const dados = await this.getCartas(busca);
				this.setState({dados}, () => {
					this.sincronizando = false;
					res();
				});
			})
		});
	}

	handleChange = busca => {
		this.setState({busca}, this.sincronizar)
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
				(this.state.dados.length > 0)
				? this.state.dados.map(this.getCard)
				: <img src={require('./loading.gif')} alt="Loading" />
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
					key={infos.titulo+infos.codigo}
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
							width: "auto",
							height: "100%",
							marginLeft: "20px",
							wordBreak: "break-all"
						}}
					>
						<h4>{infos.titulo}<span className="text-muted">{" "+infos.codigo}</span> </h4>
					</div>
		</div>;
	}
}

export default App;
