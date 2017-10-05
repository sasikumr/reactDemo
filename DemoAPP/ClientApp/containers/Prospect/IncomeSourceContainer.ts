import IncomeSource from '../../components/Prospect/IncomeSource';
import { connect } from 'react-redux';
import {mapDispatchToProps} from './PersonalInformationContainer';

const mapStateToProps = (state) => ({       
    incomeAccountSalary: state.ProspectDetail.incomeAccountSalary,
    socialSecurity: state.ProspectDetail.socialSecurity,
    pensionBenefits: state.ProspectDetail.pensionBenefits,
    investmentIncome: state.ProspectDetail.investmentIncome,
    rmd: state.ProspectDetail.rmd,
    other: state.ProspectDetail.other,
    expensesAmount: state.ProspectDetail.expensesAmount    
});
export const IncomeSourceContainer = connect(mapStateToProps, mapDispatchToProps)(IncomeSource);