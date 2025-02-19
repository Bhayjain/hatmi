/**
 * Internal Dependencies
 */
// Auth
import AuthSignIn from './AuthSignIn';
import AuthSignUp from './AuthSignUp';

// Start
import Dashboard from './Dashboard';

// Apps
import Mailbox from './Mailbox';
import Messenger from './Messenger';
import Calendar from './Calendar';
import ProjectManagement from './ProjectManagement';
import Task from './Task';
import FileManager from './FileManager';
import Profile from './Profile';

// Content
import Grid from './Grid';
import Colors from './Colors';
import Typography from './Typography';
import ComponentTable from './ComponentTable';

// Components Base
import ComponentAlert from './ComponentAlert';
import ComponentBadge from './ComponentBadge';
import ComponentBreadcrumbs from './ComponentBreadcrumbs';
import ComponentButton from './ComponentButton';
import ComponentCard from './ComponentCard';
import ComponentCarousel from './ComponentCarousel';
import ComponentCollapse from './ComponentCollapse';
import ComponentDropdown from './ComponentDropdown';
import ComponentListGroup from './ComponentListGroup';
import ComponentMediaObject from './ComponentMediaObject';
import ComponentModal from './ComponentModal';
import ComponentNav from './ComponentNav';
import ComponentPagination from './ComponentPagination';
import ComponentPopover from './ComponentPopover';
import ComponentProgress from './ComponentProgress';
import ComponentSpinner from './ComponentSpinner';
import ComponentTabs from './ComponentTabs';

// Components Advanced
import ComponentIconsFeather from './ComponentIconsFeather';
import ComponentIconsFontAwesome from './ComponentIconsFontAwesome';
import ComponentChartsChartJs from './ComponentChartsChartJs';
import ComponentChartsChartist from './ComponentChartsChartist';
import ComponentChartsPeity from './ComponentChartsPeity';
import ComponentChartsEcharts from './ComponentChartsEcharts';
import ComponentChartsFlot from './ComponentChartsFlot';
import ComponentTimeline from './ComponentTimeline';
import ComponentTreeView from './ComponentTreeView';
import ComponentToast from './ComponentToast';
import ComponentSweetAlert from './ComponentSweetAlert';
import ComponentMaps from './ComponentMaps';
import ComponentDataTables from './ComponentDataTables';

// Forms
import FormsBase from './FormsBase';
import FormsDateTimePicker from './FormsDateTimePicker';
import FormsValidation from './FormsValidation';
import FormsTouchSpin from './FormsTouchSpin';
import FormsRangeSlider from './FormsRangeSlider';
import FormsInputMasks from './FormsInputMasks';
import FormsDropzone from './FormsDropzone';
import FormsColorPicker from './FormsColorPicker';
import FormsSelect from './FormsSelect';
import FormsWysiwyg from './FormsWysiwyg';
import FormsMarkdown from './FormsMarkdown';
import ForgetPassword from './ForgetPassword';
import ResetPassword from './ResetPassword' 
import OTP from './Otp';
import Settings from './Settings';
import Properties from './Properties';
import Rooms from './Rooms';
import Payments from './Payments';
import Guests from './Guests';
import Reservation from './Reservations';
import FrontDeskPage from './FrontDesk';
import BookingDetails from './BookingDetails';
import PropertyLoaction from './PropertyLocation';
import RoomType from './RoomType';
import PropertyAminities from './PropertyAminities';
import RoomAminities from './RoomAminities';
import CompanyDetails from './CompanyDetails';
import ExtraServices from './ExtraService';
import Taxes from './Taxes';
import PeopertyDetails from './PropertyDetails';
import RoomDetails from './RoomDeatils';
import Coupon from './Coupon';
import FrontDeskPage2 from './FrontDesk2';
import AdminRole from './AdminRole';
import EmployeeManagement from './EmployeeManagement';
import Leave from './Leave';
import Attendance from './Attendance';
import SwapRole from './SwapRole';
import ShiftSchedule from './ShiftSchedule';
import MusterRoll from './MusterRoll';
export default {
    '/sign-in': AuthSignIn,
    '/sign-up': AuthSignUp,
    '/forget-password': ForgetPassword,
    '/otp': OTP,
    '/reset-password': ResetPassword,
    '/': Dashboard,
    '/settings': Settings,
    '/properties': Properties,
    '/rooms': Rooms,
    '/payments': Payments,
    '/guests': Guests,
    '/reservation': Reservation,
    '/front-desk-old': FrontDeskPage,
    '/front-desk': FrontDeskPage2,
    '/booking-details': BookingDetails,
    '/property-loaction': PropertyLoaction,
    '/room-type': RoomType,
    '/property-aminities': PropertyAminities,
    '/room-aminities': RoomAminities,
    '/company-details': CompanyDetails,
    '/extra-service': ExtraServices,
    '/taxes': Taxes,
    '/peoperty-details': PeopertyDetails,
    '/room-details': RoomDetails,
    '/coupon': Coupon,
    '/role': AdminRole,
    '/employee' :EmployeeManagement,
    '/leave' :Leave,
    '/attendance' :Attendance,
    '/approval-request' :SwapRole,
    '/shift-schedule' :ShiftSchedule,
    '/task': Task,
    '/muster-roll': MusterRoll,
    





    // '/': Dashboard,
    // '/cheque': Mailbox,

    // Apps
    // '/doctors': Mailbox,
    // '/user-management': Messenger,
    // '/setting': Calendar,
    // '/masters': ProjectManagement,
    // '/time-tracker': Task,
    // '/employee-management': FileManager,
    // '/schedule': Profile,

    // '/admin-role': ComponentAlert,
    // '/agent-management': ComponentBadge,
    // '/designation': ComponentBreadcrumbs,
    // '/support': ComponentButton,
    // '/sales': ComponentCard,
    // '/lead': ComponentChartsEcharts,
    // '/task': ComponentChartsFlot,
    // '/vehicle-registration-year': ComponentCarousel,
    // '/vehicle-brand': ComponentCollapse,
    // '/fuel-type': ComponentDropdown,
    // '/rto': ComponentChartsChartist,
    // '/vehicle-model': ComponentChartsChartJs,


    // Content
    // '/setting': Grid,
    // '/slot-machine': FormsWysiwyg,
    // '/retailer': Mailbox,
    // '/retailer-komal': Colors,
    //  '/videos': Messenger,
    //  '/app-user-setting': Typography,
    //  '/schedule': Profile,

    //   '/task': Task,













    // '/policy-dock': Grid,
    // '/mis-dock': Colors,
    // // '/operation-dock': Colors,
    // '/insurer': Typography,
    // // '/typography': Typography,
    // '/accounting': ComponentTable,
    // '/daily-sales-report': ComponentIconsFeather,
    // '/sm-business-wise': ComponentIconsFontAwesome,
    // '/insurer-wise-business': ComponentListGroup,
    // '/pending-payout': ComponentMediaObject,
    // '/pending-payment-report': ComponentMaps,
    // '/employee-wise-report': ComponentModal,
    // '/category-wise-report': ComponentNav,
    // '/investment-report': ComponentPagination,
    // '/company-wise-report': ComponentPopover,
    // '/deviation-dock': FormsWysiwyg,
    // '/pending-payment': ComponentProgress,

    // Components Base
    // '/component-alert': ComponentAlert,
    // '/component-badge': ComponentBadge,
    // '/component-breadcrumbs': ComponentBreadcrumbs,
    // '/component-button': ComponentButton,
    // '/component-card': ComponentCard,
    // '/component-carousel': ComponentCarousel,
    // '/component-collapse': ComponentCollapse,
    // '/component-dropdown': ComponentDropdown,
    // '/component-list-group': ComponentListGroup,
    // '/component-media-object': ComponentMediaObject,
    // '/component-modal': ComponentModal,
    // '/component-nav': ComponentNav,
    // '/component-pagination': ComponentPagination,
    // '/component-popover': ComponentPopover,
    // '/component-progress': ComponentProgress,
    '/cheque-report': ComponentSpinner,
    '/component-tabs': ComponentTabs,

    // Components Advanced
    // '/component-icons-feather': ComponentIconsFeather,
    // '/component-icons-fontawesome': ComponentIconsFontAwesome,
    // '/component-charts-chartjs': ComponentChartsChartJs,
    // '/component-charts-chartist': ComponentChartsChartist,
    '/component-charts-peity': ComponentChartsPeity,
    // '/component-charts-echarts': ComponentChartsEcharts,
    // '/component-charts-flot': ComponentChartsFlot,
    '/component-timeline': ComponentTimeline,
    '/component-tree-view': ComponentTreeView,
    '/component-toast': ComponentToast,
    '/component-sweet-alert': ComponentSweetAlert,
    // '/component-maps': ComponentMaps,
    '/component-data-tables': ComponentDataTables,

    // Forms Base
    '/forms-base': FormsBase,
    '/forms-datetime': FormsDateTimePicker,
    '/forms-validation': FormsValidation,
    '/forms-touch-spin': FormsTouchSpin,
    '/forms-range-slider': FormsRangeSlider,
    '/forms-input-masks': FormsInputMasks,
    '/forms-dropzone': FormsDropzone,
    '/forms-colorpicker': FormsColorPicker,
    '/forms-select': FormsSelect,
    // '/forms-wysiwyg': FormsWysiwyg,
    '/forms-markdown': FormsMarkdown,
};
