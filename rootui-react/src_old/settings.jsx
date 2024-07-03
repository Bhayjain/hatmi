/**
 * App Settings
 */
 import Cookies from 'js-cookie';
//  import Icon from '../../components/icon';




var check = Cookies.get( 'night_mode_cookie');
if(check== "true"){
   var night_mode =true
}
else
{
    var night_mode =false
}

const coupon_view = Cookies.get("coupon_view")
const front_desk_view = Cookies.get("front_desk_view")
// const leave_view = Cookies.get("leave_view")
// const attendance_view = Cookies.get("attendance_view")
const swap_view = Cookies.get("swap_view")
const master_view = Cookies.get("master_view")
const properties_dock_view = Cookies.get("properties_dock_view")

const reservation_view = Cookies.get("reservation_view")
const employee_view = Cookies.get("employee_view")
const hrm_view = Cookies.get("employee_view")
const task_view = Cookies.get("employee_view")
console.log("employee_view@@@@@@@@@@@@@@@@@@@@@@@",employee_view);










var nevigation_sidebar = {};

console.log("front_desk_view@@@@@@@@@@@@@@@@@@@@@@@",front_desk_view);
var nevigation_sidebar = {};

if (front_desk_view == "true") {
    nevigation_sidebar['/front-desk'] = {
        name: 'Front Desk',
            icon: 'front_desk',
            iconInActive: require( '../../common-assets/images/icons/frontDesk.svg' ),
            iconActive: require( '../../common-assets/images/icons white/frontDesk.svg' ),
}

}
console.log("reservation_view@@@@@@@@@@@@@@@@@@@@@@@",reservation_view);
if (reservation_view == "true") {
    nevigation_sidebar['/reservation'] = {
        name: 'Reservation',
        icon: 'reservation',
        iconInActive: require( '../../common-assets/images/icons/reservation.svg' ),
        iconActive: require( '../../common-assets/images/icons white/reservation.svg' ),
}

}
console.log("properties_dock_view@@@@@@@@@@@@@@@@@@@@@@@",properties_dock_view);
if (properties_dock_view == "true") {
    nevigation_sidebar['/properties'] = {
        name: 'Properties',
        icon: 'properties',
        iconInActive: require( '../../common-assets/images/icons/properties.svg' ),
        iconActive: require( '../../common-assets/images/icons white/properties.svg' ),
}

}


console.log("coupon_view@@@@@@@@@@@@@@@@@@@@@@@",coupon_view);


if (coupon_view == "true") {
    nevigation_sidebar['/coupon'] = {
        name: 'Coupon',
        icon: 'coupon',
        iconInActive: require( '../../common-assets/images/icons/rooms.svg' ),
        iconActive: require( '../../common-assets/images/icons white/rooms.svg' ),
}

}

if (employee_view == "true") {
    nevigation_sidebar['/employee'] = {
        name: 'Employee',
        icon: 'employee',
        iconInActive: require( '../../common-assets/images/icons/employee.png' ),
        iconActive: require( '../../common-assets/images/icons white/employee.SVG' ),
}

}



// console.log("leave_view@@@@@@@@@@@@@@@@@@@@@@@",leave_view);
// if (leave_view == "true") {
//     nevigation_sidebar['/leave'] = {
//         name: 'Leave',
//         icon: 'leave',
//         iconInActive: require( '../../common-assets/images/icons/rooms.svg' ),
//         iconActive: require( '../../common-assets/images/icons white/rooms.svg' ),
// }

// }

// console.log("attendance_view@@@@@@@@@@@@@@@@@@@@@@@",attendance_view);
// if (attendance_view == "true") {
//     nevigation_sidebar['/attendance'] = {
//         name: 'Attendance',
//         icon: 'attendance',
//         iconInActive: require( '../../common-assets/images/icons/rooms.svg' ),
//         iconActive: require( '../../common-assets/images/icons white/rooms.svg' ),
// }

// }



console.log("hrm_view@@@@@@@@@@@@@@@@@@@@@@@",hrm_view);
if (hrm_view == "true") {
    nevigation_sidebar['/forms-select'] = {
        name: 'HRM',
            icon: 'Hrm',
            iconInActive: require( '../../common-assets/images/icons/leave.svg' ),
            iconActive: require( '../../common-assets/images/icons white/leave.SVG' ),
            sub :{
                '/leave': {
                    name: 'Leave',
                   },
                '/attendance': {
                    name: 'Attendance',
                   },
                '/shift-schedule': {
                    name: 'Shift Schedule',
                   },
                   '/muster-roll': {
                    name: 'Muster Roll',
                   },
}

}
}
// console.log("swap_view@@@@@@@@@@@@@@@@@@@@@@@",swap_view);
// if (swap_view == "true") {
//     nevigation_sidebar['/approval-request'] = {
//         name: 'Approval Request',
//             icon: 'swap',
//             iconInActive: require( '../../common-assets/images/icons/swap.svg' ),
//             iconActive: require( '../../common-assets/images/icons white/swap.SVG' ),
// }

// }
console.log("swap_view@@@@@@@@@@@@@@@@@@@@@@@",swap_view);

if (swap_view == "true") {
    nevigation_sidebar['/approval-request'] = {
        name: 'Approval Request',
        icon: 'swap',
        iconInActive: require( '../../common-assets/images/icons/swap.svg' ),
        iconActive: require( '../../common-assets/images/icons white/swap.SVG' ),
}

}



console.log("properties_dock_view@@@@@@@@@@@@@@@@@@@@@@@",properties_dock_view);
if (properties_dock_view == "true") {
    nevigation_sidebar['/properties'] = {
        name: 'Properties',
        icon: 'properties',
        iconInActive: require( '../../common-assets/images/icons/properties.svg' ),
        iconActive: require( '../../common-assets/images/icons white/properties.svg' ),
}

}
console.log("task_view@@@@@@@@@@@@@@@@@@@@@@@",task_view);
if (task_view == "true") {
    nevigation_sidebar['/task'] = {
                  name: 'Task',
            icon: 'task',
            iconInActive: require( '../../common-assets/images/icons/swap.svg' ),
            iconActive: require( '../../common-assets/images/icons white/swap.SVG' ),
}

}






if (master_view == "true") {
    console.log("master_view@@@@@@@@@@@@@@@@@@@@@@@",master_view);
    nevigation_sidebar['/typography'] = {
        name: 'Master',
        icon: 'settings',
        iconInActive: require( '../../common-assets/images/icons/settings.svg' ),
        iconActive: require( '../../common-assets/images/icons white/settings.svg' ),
        sub :{
                        '/property-loaction': {
                            name: 'Location',
                           },
                        '/room-type': {
                            name: 'Room Type',
                           },
                        '/property-aminities': {
                            name: 'Property Aminities',
                           },
                        '/room-aminities': {
                            name: 'Room Aminities',
                           },
                        '/company-details': {
                            name: 'Company Details',
                           },
                        '/taxes': {
                            name: 'Taxes',
                           },
                        '/extra-service': {
                            name: 'Extra Service',
                           },
                           '/role': {
                            name: 'Role',
                           },
                          
                    }
}

}



// if (attendance_view == "true") {
//     nevigation_sidebar['/attendance'] = {
//         name: 'Attendance',
//         icon: 'attendance',
//         iconInActive: require( '../../common-assets/images/icons/rooms.svg' ),
//         iconActive: require( '../../common-assets/images/icons white/rooms.svg' ),
// }

// }
// nevigation_sidebar['/setting'] = {
//     name: 'Setting',
//     // name: 'Policy Dock',
//     icon: 'slack',
// }





const settings = {
    api_url : "http://54.92.222.79:3000/", //Demo Link Slot
    api_url_phase_2 : "http://192.168.29.184:3000/", //Demo Link Slot
    night_mode: night_mode,
    spotlight_mode: false,
    show_section_lines: true,
    sidebar_dark: false,
    sidebar_static: false,
    sidebar_small: false,
    sidebar_effect: 'shrink',
    nav: true,
    nav_dark: false,
    nav_logo_path: require( '../../common-assets/images/icons/hotel management logo.svg' ),
    nav_logo_white_path: require( '../../common-assets/images/icons/hotel management logo.svg' ),
    nav_logo_width: '45px',
    nav_logo_url: '/upload-contact',
    nav_align: 'left',
    nav_expand: 'lg',
    nav_sticky: true,
    nav_autohide: true,
    nav_container_fluid: true,
    home_url: '/upload-contact',
    navigation: {
        // '#actions': {
        //     name: 'Actions',
        //     icon: 'layers',
        //     sub: {
        //         '#create-post': {
        //             name: 'Create Post',
        //             icon: 'plus-circle',
        //         },
        //         '#create-page': {
        //             name: 'Create Page',
        //             icon: 'plus-circle',
        //         },
        //         '#manage-users': {
        //             name: 'Manage Users',
        //             icon: 'users',
        //         },
        //         '#manage-sites': {
        //             name: 'Manage Sites',
        //             icon: 'sidebar',
        //             sub: {
        //                 '#my-site-1': {
        //                     name: 'My Site 1',
        //                 },
        //                 '#my-site-2': {
        //                     name: 'My Site 2',
        //                 },
        //                 '#my-site-3': {
        //                     name: 'My Site 3',
        //                 },
        //             },
        //         },
        //     },
        // },
    },
    // navigation_sidebar:nevigation_sidebar,
    // navigation_sidebar:nevigation_sidebar,
    navigation_sidebar:nevigation_sidebar,
    // {
    //     // '/': {
    //     //     name: 'Dashboard',
    //     //     icon: 'dashboard',
    //     //     iconInActive: require( '../../common-assets/images/icons/dashboard.svg' ),
    //     //     iconActive: require( '../../common-assets/images/icons white/dashboard.svg' ),
    //     // },
    //     // '/front-desk-old': {
    //     //     name: 'Front Desk',
    //     //     icon: 'front_desk',
    //     //     iconInActive: require( '../../common-assets/images/icons/frontDesk.svg' ),
    //     //     iconActive: require( '../../common-assets/images/icons white/frontDesk.svg' ),
    //     // },

        
        
        
    //       '/front-desk': {
    //         name: 'Front Desk',
    //         icon: 'front_desk',
    //         iconInActive: require( '../../common-assets/images/icons/frontDesk.svg' ),
    //         iconActive: require( '../../common-assets/images/icons white/frontDesk.svg' ),
    //     },
    //     '/reservation': {
    //         name: 'Reservation',
    //         icon: 'reservation',
    //         iconInActive: require( '../../common-assets/images/icons/reservation.svg' ),
    //         iconActive: require( '../../common-assets/images/icons white/reservation.svg' ),
    //     },
    //     // '/guests': {
    //     //     name: 'Guests',
    //     //     icon: 'guests',
    //     //     iconInActive: require( '../../common-assets/images/icons/guests.svg' ),
    //     //     iconActive: require( '../../common-assets/images/icons white/guests.svg' ),
    //     // },
    //     // '/payments': {
    //     //     name: 'Payments',
    //     //    icon: 'payments',
    //     //     iconInActive: require( '../../common-assets/images/icons/payments.svg' ),
    //     //     iconActive: require( '../../common-assets/images/icons white/payments.svg' ),
    //     // },
    //     // '/rooms': {
    //     //     name: 'Rooms',
    //     //    icon: 'rooms',
    //     //     iconInActive: require( '../../common-assets/images/icons/rooms.svg' ),
    //     //     iconActive: require( '../../common-assets/images/icons white/rooms.svg' ),
    //     // },
    //     '/properties': {
    //         name: 'Properties',
    //         icon: 'properties',
    //         iconInActive: require( '../../common-assets/images/icons/properties.svg' ),
    //         iconActive: require( '../../common-assets/images/icons white/properties.svg' ),
    //     },
    //     '/properties': {
    //         name: 'Properties',
    //         icon: 'properties',
    //         iconInActive: require( '../../common-assets/images/icons/properties.svg' ),
    //         iconActive: require( '../../common-assets/images/icons white/properties.svg' ),
    //     },
    //     '/coupon': {
    //         name: 'Coupon',
    //         icon: 'coupon',
    //         iconInActive: require( '../../common-assets/images/icons/rooms.svg' ),
    //         iconActive: require( '../../common-assets/images/icons white/rooms.svg' ),
    //     },
    //     '/employee': {
    //         name: 'Employee',
    //         icon: 'employee',
    //         iconInActive: require( '../../common-assets/images/icons/employee.png' ),
    //         iconActive: require( '../../common-assets/images/icons white/employee.SVG' ),
    //     },
    //     // '/leave': {
    //     //     name: 'Leave',
    //     //     icon: 'leave',
    //     //     iconInActive: require( '../../common-assets/images/icons/leave.svg' ),
    //     //     iconActive: require( '../../common-assets/images/icons white/leave.SVG' ),
    //     // },
    //     // '/attendance': {
    //     //     name: 'Attendance',
    //     //     icon: 'attendance',
    //     //     iconInActive: require( '../../common-assets/images/icons/attendance.svg' ),
    //     //     iconActive: require( '../../common-assets/images/icons white/attendance.SVG' ),
    //     // },

    //     '/forms-select': {
    //         name: 'HRM',
    //         icon: 'Hrm',
    //         iconInActive: require( '../../common-assets/images/icons/leave.svg' ),
    //         iconActive: require( '../../common-assets/images/icons white/leave.SVG' ),
    //         sub :{
    //             '/leave': {
    //                 name: 'Leave',
    //                },
    //             '/attendance': {
    //                 name: 'Attendance',
    //                },
    //             '/shift-schedule': {
    //                 name: 'Shift Schedule',
    //                },
    //                '/muster-roll': {
    //                 name: 'Muster Roll',
    //                },
    //         }
    //     },

    //     '/approval-request': {
    //         name: 'Approval Request',
    //         icon: 'swap',
    //         iconInActive: require( '../../common-assets/images/icons/swap.svg' ),
    //         iconActive: require( '../../common-assets/images/icons white/swap.SVG' ),
    //     },
    //     '/task': {
    //         name: 'Task',
    //         icon: 'task',
    //         iconInActive: require( '../../common-assets/images/icons/swap.svg' ),
    //         iconActive: require( '../../common-assets/images/icons white/swap.SVG' ),
    //     },
    //     // '/settings': {
    //     //     name: 'Settings',
    //     //    icon: 'settings',
    //     //     iconInActive: require( '../../common-assets/images/icons/settings.svg' ),
    //     //     iconActive: require( '../../common-assets/images/icons white/settings.svg' ),
    //     // },
        


    //     '/typography': {
    //         name: 'Master',
    //         icon: 'settings',
    //         iconInActive: require( '../../common-assets/images/icons/settings.svg' ),
    //         iconActive: require( '../../common-assets/images/icons white/settings.svg' ),
    //         sub :{
    //             '/property-loaction': {
    //                 name: 'Location',
    //                },
    //             '/room-type': {
    //                 name: 'Room Type',
    //                },
    //             '/property-aminities': {
    //                 name: 'Property Aminities',
    //                },
    //             '/room-aminities': {
    //                 name: 'Room Aminities',
    //                },
    //             '/company-details': {
    //                 name: 'Company Details',
    //                },
    //             '/taxes': {
    //                 name: 'Taxes',
    //                },
    //             '/extra-service': {
    //                 name: 'Extra Service',
    //                },
    //                '/role': {
    //                 name: 'Role',
    //                },
                  
    //         }
    //     },

    // },
    breadcrumbs_presets: {
        apps: {
            '/mailbox': 'Mailbox',
            '/messenger': 'Messenger',
            '/calendar': 'Calendar',
            '/project-management': 'Project Management',
            '/file-manager': 'File Manager',
            '/profile': 'Profile',
        },
        content: {
            '/grid': 'Grid',
            '/colors': 'Colors',
            '/typography': 'Typography',
            '/component-table': 'Tables',
        },
        components_base: {
            '/component-alert': 'Alert',
            '/component-badge': 'Badge',
            '/component-breadcrumbs': 'Breadcrumbs',
            '/component-button': 'Button',
            '/component-card': 'Card',
            '/component-carousel': 'Carousel',
            '/component-collapse': 'Collapse',
            '/component-dropdown': 'Dropdown',
            '/component-list-group': 'List Group',
            '/component-media-object': 'Media Object',
            '/component-modal': 'Modal',
            '/component-nav': 'Nav',
            '/component-pagination': 'Pagination',
            '/component-popover': 'Popover',
            '/component-progress': 'Progress',
            '/component-spinner': 'Spinner',
            '/component-tabs': 'Tabs',
        },
        components_advanced: {
            '/component-icons-feather': 'Icons: Feather',
            '/component-icons-fontawesome': 'Icons: Font Awesome',
            '/component-charts-chartjs': 'Charts: Chart.js',
            '/component-charts-chartist': 'Charts: Chartist',
            '/component-charts-peity': 'Charts: Peity',
            '/component-charts-echarts': 'Charts: eCharts',
            '/component-charts-flot': 'Charts: Flot',
            '/component-timeline': 'Timeline',
            '/component-tree-view': 'Tree View',
            '/component-toast': 'Toast',
            '/component-sweet-alert': 'Sweet Alert',
            '/component-maps': 'Maps',
            '/component-data-tables': 'Data Tables',
        },
        forms_advanced: {
            '/forms-datetime': 'DateTime Picker',
            '/forms-validation': 'Validation',
            '/forms-touch-spin': 'Touch Spin',
            '/forms-range-slider': 'Range Slider',
            '/forms-input-masks': 'Input Masks',
            '/forms-dropzone': 'Dropzone',
            '/forms-colorpicker': 'Color Picker',
            '/forms-select': 'Select',
            '/forms-markdown': 'Markdown editor',
            '/forms-wysiwyg': 'WYSIWYG editor',
        },
    },

    img_country: {
        usa: require( '../../common-assets/images/flags/united-states-of-america.svg' ),
        china: require( '../../common-assets/images/flags/china.svg' ),
        germany: require( '../../common-assets/images/flags/germany.svg' ),
        japan: require( '../../common-assets/images/flags/japan.svg' ),
        spain: require( '../../common-assets/images/flags/spain.svg' ),
        france: require( '../../common-assets/images/flags/france.svg' ),
        canada: require( '../../common-assets/images/flags/canada.svg' ),
        netherlands: require( '../../common-assets/images/flags/netherlands.svg' ),
        italy: require( '../../common-assets/images/flags/italy.svg' ),
        russia: require( '../../common-assets/images/flags/russia.svg' ),
        czech_republic: require( '../../common-assets/images/flags/czech-republic.svg' ),
    },
    img_file: {
        empty: require( '../../common-assets/images/icon-empty.svg' ),
        zip: require( '../../common-assets/images/icon-zip.svg' ),
        rar: require( '../../common-assets/images/icon-rar.svg' ),
        html: require( '../../common-assets/images/icon-html.svg' ),
        php: require( '../../common-assets/images/icon-php.svg' ),
        css: require( '../../common-assets/images/icon-css.svg' ),
        js: require( '../../common-assets/images/icon-js.svg' ),
        doc: require( '../../common-assets/images/icon-doc.svg' ),
        txt: require( '../../common-assets/images/icon-txt.svg' ),
        pdf: require( '../../common-assets/images/icon-pdf.svg' ),
        xls: require( '../../common-assets/images/icon-xls.svg' ),
        png: require( '../../common-assets/images/icon-png.svg' ),
        jpg: require( '../../common-assets/images/icon-jpg.svg' ),
    },
    users: [
        {
            img: require( '../../common-assets/images/avatar-1-profile.png' ),
            img_profile: require( '../../common-assets/images/avatar-1-profile.png' ),
            name: 'Jack Boyd',
        }, {
            img: require( '../../common-assets/images/avatar-2.png' ),
            name: 'Helen Holt',
        }, {
            img: require( '../../common-assets/images/avatar-3.png' ),
            name: 'Avice Harris',
        }, {
            img: require( '../../common-assets/images/avatar-4.png' ),
            name: 'Anna Rice',
        }, {
            img: require( '../../common-assets/images/avatar-5.png' ),
            name: 'Amber Smith',
        }, {
            img: require( '../../common-assets/images/avatar-6.png' ),
            name: 'Mary Rose',
        },
    ],
    letters: [
        {
            img: require( '../../common-assets/images/letter-1.png' ),
            img_min: require( '../../common-assets/images/letter-1-min.png' ),
        }, {
            img: require( '../../common-assets/images/letter-2.png' ),
            img_min: require( '../../common-assets/images/letter-2-min.png' ),
        }, {
            img: require( '../../common-assets/images/letter-3.png' ),
            img_min: require( '../../common-assets/images/letter-3-min.png' ),
        }, {
            img: require( '../../common-assets/images/letter-4.png' ),
            img_min: require( '../../common-assets/images/letter-4-min.png' ),
        },
    ],
    homeScreen: [
         {
            img: require( '../../common-assets/images/homescreen.png' ),
            name: 'Home Screen',
        },
         {
            img: require( '../../common-assets/images/icons/logo.svg' ),
            name: 'Logo',
        },
         {
            img: require( '../../common-assets/images/icons/hotel management logo.svg' ),
            name: 'Hotel Logo',
        },
    ],
};

/* Parse GET variables to change initial settings */
const $_GET = {};
window.location.href.replace( /[?&]+([^=&]+)=([^&]*)/gi, ( a, name, value ) => {
    $_GET[ name ] = value;
} );

Object.keys( $_GET ).forEach( ( name ) => {
    const isTrue = $_GET[ name ] === '1';

    switch ( name ) {
    case 'setting-night-mode':
        settings.night_mode = isTrue;
        break;
    case 'setting-show-section-lines':
        settings.show_section_lines = isTrue;
        break;
    case 'setting-sidebar-small':
        settings.sidebar_small = isTrue;
        break;
    case 'setting-sidebar-dark':
        settings.sidebar_dark = isTrue;
        break;
    case 'setting-nav-dark':
        settings.nav_dark = isTrue;
        break;
    // no default
    }
} );

export default settings;
