// import { jtc, JTC_CONFIG } from "json-to-clarity";
// import moment from "moment";
// import {NO_DATA} from "./common/utils/print-repoty";
//
// const setSectionTitleCount = (socialNetwork) => {
//     if(socialNetwork.data.length > 1) {
//         return socialNetwork.data.length;
//     }
//
//     if(socialNetwork.data.length === 1 &&  socialNetwork.data[0].title !== NO_DATA.title) {
//         return socialNetwork.data.length;
//     }
//
//     return 0
// }
//
// const columns = [
//     {
//         displayValue: "Title",
//         columnId: "title",
//         styles: {
//             width: "20%"
//         }
//     },
//     {
//         displayValue: "Description",
//         columnId: "description",
//         styles: {
//             width: "50%"
//         }
//     },
//     {
//         displayValue: "Created",
//         columnId: "created",
//         styles: {
//             width: "15%"
//         }
//     },
//     {
//         displayValue: "Status",
//         columnId: "status",
//     },
//     {
//         displayValue: "Link",
//         columnId: "link",
//     }
// ]
//
// const page = {
//     $forEach_: {
//         dataSrcPath: "socials",
//         $do_: socialNetwork => {
//             if(socialNetwork.data.length > 0) {
//                 return {
//                     grid: {
//                         title: socialNetwork.id,
//                         columns,
//                         titleCount: setSectionTitleCount(socialNetwork),
//                         titleCountLabel: "posts",
//                         gridRow: {
//                             $forEach_: {
//                                 dataSrcPath: "data",
//                                 dataSrc: socialNetwork,
//                                 $do_: entry => ([
//                                         {
//                                             cellValue: entry.title,
//                                             columnId: "title"
//                                         },
//                                         {
//                                             cellValue: entry.description,
//                                             columnId: "description"
//                                         },
//                                         {
//                                             cellValue: entry.created,
//                                             columnId: "created"
//                                         },
//                                         {
//                                             cellValue: entry.status,
//                                             columnId: "status"
//                                         },
//                                         {
//                                             cellValue: entry.url ? `<a href="${entry.url}" target="_blank">Go to</a>` : "-",
//                                             columnId: "link"
//                                         },
//                                     ]
//                                 )
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
// };
//
// export const generatePrintReport = (data) => {
//     const config: any = {
//         ...JTC_CONFIG,
//         saveToDir: "./",
//         pageTitle: `Hermes Report | Report generated date: ${moment().format("MM/DD/YYYY")}`,
//         data: data,
//         page
//     }
//
//     if(data) {
//         jtc.generateHtml(config);
//
//     }
// }
