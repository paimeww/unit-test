import { Circle, Grid, Home, Server } from "react-feather";

export const navigationData = [
  {
    id: "home",
    title: "Home",
    icon: <Home size={24} />,
    href: "/home",
  },

  {
    id: "esourcing",
    title: "e-Sourcing",
    icon: <Grid size={24} />,
    children: [
      {
        id: "assessment",
        title: "Assessment",
        icon: <Server size={24} />,
        href: "/assessment",
        children: [
          {
            id: "assessment_close_project",
            title: "Close Project",
            icon: <Circle size={12} />,
            href: "/assessment/close_project",
          },
          {
            id: "assessment_material_review",
            title: "Material Review",
            icon: <Circle size={12} />,
            href: "/assessment/material_review",
          },
          {
            id: "assessment_task",
            title: "Task",
            icon: <Circle size={12} />,
            href: "/assessment/task",
          },
          {
            id: "assessment_transfer_data",
            title: "Transfer Data",
            icon: <Circle size={12} />,
            href: "/assessment/transfer_data",
          },
          {
            id: "assessment_transfer_document",
            title: "Transfer Document",
            icon: <Circle size={12} />,
            href: "/assessment/transfer_document",
          },
        ],
      },
      {
        id: "bank_data_material",
        title: "Bank Data Material",
        icon: <Server size={24} />,
        href: "/bank_data_material",
        children: [
          {
            id: "bank_data_material_supplier_catalogue",
            title: "Supplier Catalogue",
            icon: <Circle size={12} />,
            href: "/bank_data_material/supplier_catalogue",
          },
        ],
      },
      {
        id: "change_notification",
        title: "Change Notification",
        icon: <Server size={24} />,
        href: "/change_notification",
        children: [
          {
            id: "change_notification_list",
            title: "Change Notification",
            icon: <Circle size={12} />,
            href: "/change_notification/CPRO",
          },
        ],
      },
      {
        id: "data_master",
        title: "Data Master Item",
        icon: <Server size={24} />,
        href: "/data_master",
        children: [
          {
            id: "data_master_graphic",
            title: "Data Master Graphic",
            icon: <Circle size={12} />,
            href: "/data_master/chart",
          },
          {
            id: "data_master_item",
            title: "Data Master Item",
            icon: <Circle size={12} />,
            href: "/data_master/item",
          },
          {
            id: "data_master_request_budget",
            title: "Request Budget",
            icon: <Circle size={12} />,
            href: "/data_master/request_budget",
          },
          {
            id: "data_master_suggestion_project",
            title: "Suggestion Project",
            icon: <Circle size={12} />,
            href: "/data_master/suggestion_project",
          },
        ],
      },
      {
        id: "master",
        title: "Master",
        icon: <Server size={24} />,
        href: "/master",
        children: [
          {
            id: "master_change_pic",
            title: "Change PIC",
            icon: <Circle size={12} />,
            href: "/master/change_pic",
          },
          {
            id: "master_job_list",
            title: "Job List",
            icon: <Circle size={12} />,
            href: "/master/job_list",
          },
          {
            id: "master_change_category",
            title: "Change Category",
            icon: <Circle size={12} />,
            href: "/master/change_category",
          },
          {
            id: "master_country",
            title: "Country",
            icon: <Circle size={12} />,
            href: "/master/country",
          },
          {
            id: "master_document_clustering",
            title: "Document Clustering",
            icon: <Circle size={12} />,
            href: "/master/document_clustering",
          },
          {
            id: "master_material_code",
            title: "Info for Material Code",
            icon: <Circle size={12} />,
            href: "/master/material_code",
          },
          {
            id: "master_info_material_function",
            title: "Info for Material Function",
            icon: <Circle size={12} />,
            href: "/master/material_function",
          },
          {
            id: "master_manufacturing_site",
            title: "Manufacturing Site",
            icon: <Circle size={12} />,
            href: "/master/manufacturing_site",
          },
          {
            id: "master_notification_template",
            title: "Notification Template",
            icon: <Circle size={12} />,
            href: "/master/notification_template",
          },
          {
            id: "master_notification_rule",
            title: "Notification Rule",
            icon: <Circle size={12} />,
            href: "/master/notification_rule",
          },
          {
            id: "master_pm_type",
            title: "PM Type Mapping",
            icon: <Circle size={12} />,
            href: "/master/pm_type",
          },
          {
            id: "master_qty_per_year",
            title: "Quantity per Year",
            icon: <Circle size={12} />,
            href: "/master/qty_per_year",
          },
          {
            id: "master_scoring",
            title: "Scoring",
            icon: <Circle size={12} />,
            href: "/master/scoring",
          },
          {
            id: "master_supplier_document",
            title: "Supplier Document",
            icon: <Circle size={12} />,
            href: "/master/supplier_document",
          },
          {
            id: "master_supplier_function",
            title: "Supplier Function",
            icon: <Circle size={12} />,
            href: "/master/supplier_function",
          },
          {
            id: "master_target_lt_ppcr",
            title: "Target LT PPCR",
            icon: <Circle size={12} />,
            href: "/master/target_lt/ppcr",
          },
          {
            id: "master_target_lt_sampel",
            title: "Target LT Sample",
            icon: <Circle size={12} />,
            href: "/master/target_lt/sampel",
          },
          {
            id: "master_target_lt_sourcing",
            title: "Target LT Sourcing",
            icon: <Circle size={12} />,
            href: "/master/target_lt/sourcing",
          },
          {
            id: "master_terms_condition",
            title: "Terms and Condition",
            icon: <Circle size={12} />,
            href: "/master/terms_condition",
          },
          {
            id: "master_user",
            title: "User",
            icon: <Circle size={12} />,
            href: "/master/user",
          },
        ],
      },
      {
        id: "material_sample_request",
        title: "Material Sample Request",
        icon: <Server size={24} />,
        href: "/material_sample_request",
        children: [
          {
            id: "material_sample_request_list", //! Not found
            title: "Material Sample Request",
            icon: <Circle size={12} />,
            href: "/material_sample_request/sample_request",
          },
          {
            id: "material_sample_request_sample_introduction",
            title: "Sample Introduction",
            icon: <Circle size={12} />,
            href: "/material_sample_request/sample_introduction",
          },
        ],
      },
      {
        id: "pm_dev",
        title: "PM Dev",
        icon: <Server size={24} />,
        href: "/pm_dev",
        children: [
          {
            id: "pm_dev_final_artwork",
            title: "Final Artwork",
            icon: <Circle size={12} />,
            href: "/pm_dev/final_artwork",
          },
          {
            id: "pm_dev_request",
            title: "PM Dev Request",
            icon: <Circle size={12} />,
            href: "/pm_dev/request",
          },
          {
            id: "pm_dev_review",
            title: "PM Develop Review",
            icon: <Circle size={12} />,
            href: "/pm_dev/review",
          },
          {
            id: "pm_dev_sourcing_selection_pm",
            title: "Sourcing Selection PM",
            icon: <Circle size={12} />,
            href: "/pm_dev/sourcing_selection_pm",
          },
        ],
      },
      {
        id: "register_supplier",
        title: "Register Supplier",
        icon: <Server size={24} />,
        href: "/register_supplier",
        children: [
          {
            id: "register_supplier_management",
            title: "Supplier Management",
            icon: <Circle size={12} />,
            href: "/register_supplier/supplier_management",
          },
        ],
      },
      {
        id: "sourcing",
        title: "Sourcing",
        icon: <Server size={24} />,
        href: "/sourcing",
        children: [
          {
            id: "sourcing_inquiry_response",
            title: "Inquiry Response",
            icon: <Circle size={12} />,
            href: "/sourcing/inquiry_response",
          },
          {
            id: "sourcing_request",
            title: "Request Sourcing",
            icon: <Circle size={12} />,
            href: "/sourcing/request_sourcing",
          },
          {
            id: "sourcing_inquiry",
            title: "Sourcing Inquiry",
            icon: <Circle size={12} />,
            href: "/sourcing/inquiry",
          },
          {
            id: "sourcing_selection",
            title: "Sourcing Selection",
            icon: <Circle size={12} />,
            href: "/sourcing/sourcing_selection",
          },
        ],
      },
      {
        id: "sourcing_performance",
        title: "Sourcing Performance",
        icon: <Server size={24} />,
        href: "/sourcing_performance",
        children: [
          {
            id: "sourcing_performance_list",
            title: "Sourcing Performance",
            icon: <Circle size={12} />,
            href: "/sourcing_performance/list",
          },
          {
            id: "sourcing_performance_supplier",
            title: "Supplier Sourcing Performance",
            icon: <Circle size={12} />,
            href: "/sourcing_performance/supplier",
          },
        ],
      },
    ],
  },
  {
    id: "econtract",
    title: "e-Contract",
    icon: <Grid size={24} />,
    children: [
      {
        id: "my-task-EContract",
        title: "My Task E-Contract",
        icon: <Server size={24} />,
        href: "/master/job_list",
      },
      {
        id: "suggstionContract",
        title: "Suggestion Contract",
        icon: <Server size={24} />,
        href: "/suggestion_contract",
        children: [
          {
            id: "suggestion_contract",
            title: "Suggestion Contract List",
            icon: <Circle size={12} />,
            href: "/suggestion_contract",
          },
        ],
      },
      {
        id: "requestForecast",
        title: "Request Forecast",
        icon: <Server size={24} />,
        href: "/request_forecast",
        children: [
          {
            id: "request_forecastList",
            title: "Request Forecast List",
            icon: <Circle size={12} />,
            href: "/request_forecast_list/views",
          },
        ],
      },
      {
        id: "forecastCalculation",
        title: "Forecast Calculation",
        icon: <Server size={24} />,
        href: "/forecast_calculation",
        children: [
          {
            id: "forecast_calculationList",
            title: "Forecast Calculation List",
            icon: <Circle size={12} />,
            href: "/forecast_calculation",
          },
        ],
      },
      {
        id: "requestBid",
        title: "Request Bid",
        icon: <Server size={24} />,
        href: "/request_bid",
        children: [
          {
            id: "requestBidList",
            title: "Request Bid List",
            icon: <Circle size={12} />,
            href: "/request_bid",
          },
        ],
      },
      {
        id: "bidResponse",
        title: "Contract Bidding",
        icon: <Server size={24} />,
        href: "/bid_response_list",
        children: [
          {
            id: "bidResponseListCPRO",
            title: "Bid Response List CPRO",
            icon: <Circle size={12} />,
            href: "/bid_response_list/view",
          },
          {
            id: "bidResponseListVENDOR",
            title: "Bid Response List Vendor",
            icon: <Circle size={12} />,
            href: "/bid_response_list/viewVendor",
          },
          {
            id: "bidComparison",
            title: "Bid Comparison",
            icon: <Circle size={12} />,
            href: "/bid_comparison",
          },
        ],
      },
      {
        id: "contractApproval",
        title: "Contract Approval",
        icon: <Server size={24} />,
        href: "/contract_approval",
        children: [
          {
            id: "listContractApproval",
            title: "Contract Approval List",
            icon: <Circle size={12} />,
            href: "/contract_approval",
          },
          // {
          //   id: "taskContractApprovalCPRO",
          //   title: "MyTask Approval Contract (CPRO)",
          //   icon: <Circle size={12} />,
          //   href: "/contract_approval/worklist_cpro",
          // },
          // {
          //   id: "taskContractApprovalVendor",
          //   title: "MyTask Approval Contract (Vendor)",
          //   icon: <Circle size={12} />,
          //   href: "/contract_approval/vendor_worklist_ca",
          // },
          {
            id: "formInquiryContractApproval",
            title: "Form Inquiry Approval Contract (Vendor)",
            icon: <Circle size={12} />,
            href: "/contract_approval/vendor_inquiry_ca",
          },
          {
            id: "printOutSetting",
            title: "Contract PrintOut",
            icon: <Circle size={12} />,
            href: "/master/print_out_setting",
          },
        ],
      },
      {
        id: "Contract_Lifecycle_Management",
        title: "Contract Lifecycle Management",
        icon: <Server size={24} />,
        href: "/monitoring_contract",
        children: [
          {
            id: "monitoring_contract",
            title: "Contract Lifecycle Management List",
            icon: <Circle size={12} />,
            href: "/monitoring_contract/list",
          },
        ],
      },
    ],
  },
  {
    id: "ep2p",
    title: "e-P2P",
    icon: <Grid size={24} />,
    children: [
      {
        id: "ep2p_acknowledge",
        title: "Acknowledge",
        icon: <Server size={24} />,
        href: "/p2p/acknowledge",
      },
      {
        id: "ep2p_forecast",
        title: "Forecast",
        icon: <Server size={24} />,
        href: "/p2p/forecast",
      },
      {
        id: "ep2p_memo",
        title: "Memo",
        icon: <Server size={24} />,
        href: "/p2p/memo",
      },
      {
        id: "ep2p_monitoring_payment",
        title: "Monitoring Payment",
        icon: <Server size={24} />,
        href: "/p2p/monitoring_payment",
      },
      {
        id: "ep2p_mppkm",
        title: "MPPKM",
        icon: <Server size={24} />,
        href: "/p2p/mppkm",
      },
      {
        id: "ep2p_outstanding",
        title: "Outstanding",
        icon: <Server size={24} />,
        href: "/p2p/outstanding",
      },
      {
        id: "ep2p_reject_material_capa",
        title: "Reject Material (CAPA)",
        icon: <Server size={24} />,
        href: "/p2p/reject_material/capa",
      },
      {
        id: "ep2p_reject_material_reject",
        title: "Reject Material (Reject)",
        icon: <Server size={24} />,
        href: "/p2p/reject_material/reject",
      },
    ],
  },
  {
    id: "ecompliance",
    title: "e-Compliance",
    icon: <Grid size={24} />,
    children: [
      {
        id: "ecompliance_delegation",
        title: "Delegation",
        icon: <Server size={24} />,
        href: "/e-compliance/delegation",
      },
      {
        id: "ecompliance_my_task",
        title: "My Task",
        icon: <Server size={24} />,
        href: "/e-compliance/my-task",
      },
      {
        id: "ecompliance_supply_agreement",
        title: "Supply Agreement",
        icon: <Server size={24} />,
        href: "/e-compliance/supply-agreement",
      },
    ],
  },
];
