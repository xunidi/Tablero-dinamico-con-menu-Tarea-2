import * as React from 'react';
import styles from './Summary.module.scss';
import summaryHeader from '../../resources/jsons/summaryHeaders.json';
import summaryData from '../../resources/jsons/summaryData.json';

export default (class Summary extends React.PureComponent {
	state = {};

    componentDidMount() {}
    
    calculateFooter = (data, item) => {
		switch (item.footer) {
			case 'sum':
				if(item.name ==='TOTAL')
					return data.reduce((acc, row) => (acc += parseFloat(row['sold']+row['promos']+row['courtesies'])),0);
				else
					return data.reduce((acc, row) => (acc += parseFloat(row[item.value])), 0);
			default:
				return item.footer;
		}
	};

	render() {
        const headers = summaryHeader;
		const data = summaryData;
		return (
			<div className={styles.main}>
                { data.map((c, it) => {
                    return (	
						<div>{data[it].date} - {data[it].name}	
							<table key= {it} className={styles.table}>
								<thead className={styles.mainHeader}>
									<tr className={styles.header}>
									{headers.map((header, i) => {
											return (
												<th key={i} className={styles.header_item}>
													{header.name}
												</th>
											);
										})}
									</tr>
								</thead>
								<tbody className={styles.body}>
									{data[it].summary.map((item, i) => {
										return (
											<tr key={i} className={styles.row}>
												{headers.map((header, i) => {
														return <td className={styles.row_item}>{ header.name ==='TOTAL' ? item['sold']+item['promos']+item['courtesies']:item[header.value] }</td>;
												})}
											</tr>
										);
									})}
								</tbody>
								<tfoot className={styles.footer}>
									<tr className={styles.footer_row}>
										{headers.map((header, i) => {
											return <td className={styles.footer_item}>{this.calculateFooter(data[it].summary, header)}</td>;
										})}
									</tr>
								</tfoot>
							</table>
						</div>	
                	);
                })}
			</div>
		);
	}
	
});