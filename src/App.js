import React from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import Topbar from './components/Topbar/Topbar';
import Tableros from './screens/Tableros/Tableros';
import Tables from './screens/Tables/Tables';
import Summary from './screens/Summary/Summary';
import Reportes from './screens/Reportes/Reportes';

export default withRouter(
	class App extends React.PureComponent {
		render() {
			return (
				<div>
					<Topbar />
					<Switch>
						<RouteWithTitle exact title="Tableros" path="/tableros" component={Tableros} />
						<RouteWithTitle exact title="Tablas" path="/tablas" component={Tables} />
						<RouteWithTitle exact title="Resumen" path="/resumen" component={Summary} />
						<RouteWithTitle exact title="Reportes" path="/reportes" component={Reportes} />
						<Redirect to={'/inicio'} />
					</Switch>
				</div>
			);
		}z
	}
);

export const RouteWithTitle = ({ title, render, component: Comp, ...props }) => (
	<Route {...props} render={(p) => <DocumentTitle title={title}>{render ? render(p) : <Comp {...p} />}</DocumentTitle>} />
);
