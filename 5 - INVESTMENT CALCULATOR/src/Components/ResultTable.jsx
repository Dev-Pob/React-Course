import {calculateInvestmentResults, formatter} from "../util/investment";

export default function ResultTable({initialInvestment, annualInvestment, expectedReturn, duration,}){
    const investmentData = calculateInvestmentResults({initialInvestment, annualInvestment, expectedReturn, duration});
    const spesaIniziale = investmentData[0].valueEndOfYear - investmentData[0].interest - investmentData[0].annualInvestment;
    return(
        <table id="result">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Investment Value</th>
                    <th>Interst (Year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>
            {investmentData.map((data)=> {
            const totalInterest = data.valueEndOfYear - data.annualInvestment * data.year - spesaIniziale;
            const totalAmountInvested = data.valueEndOfYear - totalInterest;

            return (
                <tbody>
                <tr>
                    <td>{data.year}</td>
                    <td>{formatter.format(data.valueEndOfYear)}</td>
                    <td>{formatter.format(data.interest)}</td>
                    <td>{formatter.format(totalInterest)}</td>
                    <td>{(formatter.format(totalAmountInvested))}</td>
                </tr>
            </tbody>
            )
            }
                
            )}
            
        </table>
    );
}