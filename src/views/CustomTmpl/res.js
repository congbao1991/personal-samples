/* eslint-disable */
export const res0 = [
  {
    "name": "custom_input",
    "title": "单行文本",
    "type": 1,
    "fixed": false,
    "model": {
      "field": "custom_input",
      "label": "单行文本",
      "type": "String"
    },
    "items": {}
  },
  {
    "name": "custom_area",
    "title": "多行文本",
    "type": 1,
    "fixed": false,
    "model": {
      "field": "custom_area",
      "label": "多行文本",
      "type": "String"
    },
    "items": {}
  },
  {
    "name": "custom_check_box",
    "title": "多选框",
    "type": 1,
    "fixed": false,
    "model": {
      "field": "custom_check_box",
      "label": "多选框",
      "type": "Array"
    },
    "items": {
      "label": { "field": "label", "type": "String" },
      "value": { "field": "value", "type": "String" }
    }
  },
  {
    "name": "custom_radio",
    "title": "单选框",
    "type": 1,
    "fixed": false,
    "model": { "field": "custom_radio", "label": "单选框", "type": "Object" },
    "items": {
      "label": { "field": "label", "type": "String" },
      "value": { "field": "value", "type": "String" }
    }
  },
  {
    "name": "custom_duration",
    "title": "时长",
    "type": 1,
    "fixed": false,
    "model": {
      "field": "custom_duration",
      "label": "时长",
      "type": "Object"
    },
    "items": {
      "duration": { "field": "duration", "label": "时长", "type": "Number" },
      "end_time": {
        "field": "end_time",
        "label": "结束时间",
        "type": "Number"
      },
      "start_time": {
        "field": "start_time",
        "label": "开始时间",
        "type": "Number"
      }
    }
  },
  {
    "name": "custom_detailed",
    "title": "明细",
    "type": 1,
    "fixed": false,
    "model": { "field": "custom_detailed", "label": "明细", "type": "Array" },
    "items": {}
  },
  {
    "name": "custom_number",
    "title": "数字",
    "type": 1,
    "fixed": false,
    "model": { "field": "custom_number", "label": "数字", "type": "Number" },
    "items": {}
  },
  {
    "name": "custom_amount",
    "title": "金额",
    "type": 1,
    "fixed": false,
    "model": { "field": "custom_amount", "label": "金额", "type": "Number" },
    "items": {}
  },
  {
    "name": "custom_columns",
    "title": "分栏",
    "type": 1,
    "fixed": false,
    "model": { "field": "custom_columns", "label": "分栏", "type": "Object" },
    "items": {}
  },
  {
    "name": "custom_attach",
    "title": "附件",
    "type": 1,
    "fixed": false,
    "model": { "field": "attach_list", "label": "附件列表", "type": "Array" },
    "items": {
      "attach_name": { "field": "attach_name", "type": "String" },
      "attach_url": { "field": "attach_url", "type": "String" },
      "size": { "field": "size", "type": "Number" },
      "thumbnail_url": { "field": "thumbnail_url", "type": "String" }
    }
  },
  {
    "name": "custom_date",
    "title": "日期",
    "type": 1,
    "fixed": false,
    "model": { "field": "custom_date", "label": "日期", "type": "Number" },
    "items": {}
  },
  {
    "name": "apply_list",
    "title": "关联单据",
    "type": 2,
    "fixed": false,
    "model": { "label": "关联单据", "tip": "请选择", "type": "Array" },
    "items": {
      "date": { "field": "date", "label": "招待日期", "type": "Number" },
      "id": {
        "field": "id",
        "label": "申请单id",
        "required": true,
        "type": "String"
      },
      "summary": {
        "field": "summary",
        "label": "事由",
        "required": true,
        "type": "String"
      },
      "time": {
        "field": "time",
        "label": "提单时间",
        "required": true,
        "type": "Number"
      },
      "travel_list": {
        "field": "travel_list",
        "items": {
          "trans_time": {
            "field": "trans_time",
            "items": {
              "duration": {
                "field": "duration",
                "label": "时长",
                "required": true,
                "type": "Number"
              },
              "end_time": {
                "field": "end_time",
                "label": "行程结束时间",
                "required": true,
                "type": "Number"
              },
              "start_time": {
                "field": "start_time",
                "label": "行程开始时间",
                "required": true,
                "type": "Number"
              }
            },
            "label": "时长",
            "type": "Object"
          }
        },
        "label": "出差明细",
        "type": "Array"
      },
      "type": {
        "field": "type",
        "label": "类型",
        "required": true,
        "type": "Number"
      }
    }
  },
  {
    "name": "oa_flows",
    "title": "关联单据",
    "type": 2,
    "fixed": false,
    "model": { "field": "oa_flows", "label": "关联单据", "type": "Array" },
    "items": {
      "flow_id": {
        "field": "flow_id",
        "label": "流程id",
        "required": true,
        "type": "String"
      }
    }
  },
  {
    "name": "rel_person",
    "title": "相关人",
    "type": 2,
    "fixed": false,
    "model": { "field": "rel_person", "label": "相关人", "type": "Array" },
    "items": {
      "name": {
        "field": "name",
        "label": "用户名",
        "required": true,
        "type": "String"
      },
      "uid": {
        "field": "uid",
        "label": "用户id",
        "required": true,
        "type": "Number"
      }
    }
  },
  {
    "name": "trans_list",
    "title": "行程明细",
    "type": 2,
    "fixed": false,
    "model": { "field": "trans_list", "label": "行程明细", "type": "Array" },
    "items": {
      "end_point": {
        "field": "end_point",
        "label": "目的地点",
        "required": true,
        "type": "String"
      },
      "start_point": {
        "field": "start_point",
        "label": "开始地点",
        "required": true,
        "type": "String"
      }
    }
  },
  {
    "name": "travel_list",
    "title": "出差明细",
    "type": 2,
    "fixed": false,
    "model": { "field": "travel_list", "label": "行程明细", "type": "Array" },
    "items": {
      "trans_time": {
        "field": "trans_time",
        "items": {
          "duration": {
            "field": "duration",
            "label": "时长",
            "required": true,
            "type": "Number"
          },
          "end_time": {
            "field": "end_time",
            "label": "行程结束时间",
            "required": true,
            "type": "Number"
          },
          "start_time": {
            "field": "start_time",
            "label": "行程开始时间",
            "required": true,
            "type": "Number"
          }
        },
        "label": "时长",
        "type": "Object"
      }
    }
  },
  {
    "name": "commiter",
    "title": "提单人",
    "type": 2,
    "fixed": true,
    "model": { "field": "commiter", "label": "提单人", "type": "Object" },
    "items": {
      "name": {
        "field": "name",
        "label": "用户名",
        "required": true,
        "type": "String"
      },
      "uid": {
        "field": "uid",
        "label": "用户uid",
        "required": true,
        "type": "Number"
      }
    }
  },
  {
    "name": "reimburseer",
    "title": "承担人",
    "type": 2,
    "fixed": true,
    "model": { "field": "reimburseer", "label": "承担人", "type": "Object" },
    "items": {
      "name": {
        "field": "name",
        "label": "用户名",
        "required": true,
        "type": "String"
      },
      "uid": {
        "field": "uid",
        "label": "用户uid",
        "required": true,
        "type": "Number"
      }
    }
  },
  {
    "name": "title",
    "title": "费用主体",
    "type": 2,
    "fixed": true,
    "model": { "field": "title", "label": "费用主体", "type": "Object" },
    "items": {
      "id": {
        "field": "id",
        "label": "抬头id",
        "required": true,
        "type": "Number"
      },
      "name": {
        "field": "name",
        "label": "抬头名",
        "required": true,
        "type": "String"
      }
    }
  },
  {
    "name": "department",
    "title": "承担部门",
    "type": 2,
    "fixed": true,
    "model": { "field": "department", "label": "承担部门", "type": "Object" },
    "items": {
      "full_name": {
        "field": "full_name",
        "label": "部门全名",
        "required": true,
        "type": "String"
      },
      "id": {
        "field": "id",
        "label": "部门id",
        "required": true,
        "type": "Number"
      },
      "name": {
        "field": "name",
        "label": "部门名",
        "required": true,
        "type": "String"
      }
    }
  },
  {
    "name": "summary",
    "title": "事由",
    "type": 2,
    "fixed": true,
    "model": { "field": "summary", "label": "事由", "type": "String" },
    "items": {}
  },
  {
    "name": "child_list",
    "title": "报销清单",
    "type": 2,
    "fixed": true,
    "model": { "field": "child_list", "label": "报销清单", "type": "Array" }
  },
  {
    "name": "bank",
    "title": "收款账户",
    "type": 2,
    "fixed": true,
    "model": { "field": "bank", "label": "收款账户", "type": "Object" },
    "items": {
      "bank_name": {
        "field": "bank_name",
        "label": "银行名称",
        "required": true,
        "type": "String"
      },
      "id": {
        "field": "id",
        "label": "银行卡id",
        "required": true,
        "type": "Number"
      },
      "number": {
        "field": "number",
        "label": "卡号",
        "required": true,
        "type": "String"
      },
      "user_name": {
        "field": "user_name",
        "label": "开户名称",
        "required": true,
        "type": "String"
      }
    }
  },
  {
    "name": "fee_info",
    "title": "费用明细",
    "type": 2,
    "fixed": true,
    "model": { "field": "fee_info", "label": "费用明细", "type": "Array" },
    "items": {
      "attach_list": {
        "field": "attach_list",
        "items": {
          "attach_name": {
            "field": "attach_name",
            "label": "",
            "required": true,
            "type": "String"
          },
          "attach_url": {
            "field": "attach_url",
            "label": "",
            "required": true,
            "type": "String"
          },
          "size": {
            "field": "size",
            "label": "",
            "required": true,
            "type": "Number"
          },
          "thumbnail_url": {
            "field": "thumbnail_url",
            "label": "",
            "required": true,
            "type": "String"
          }
        },
        "label": "附件",
        "required": true,
        "type": "Array"
      },
      "fee_name": {
        "field": "fee_name",
        "label": "费用名称",
        "required": true,
        "type": "String"
      },
      "fee_type": {
        "field": "fee_type",
        "label": "费用类型",
        "required": true,
        "type": "Number"
      },
      "invoice_count": {
        "field": "invoice_count",
        "label": "总发票数",
        "required": true,
        "type": "Number"
      },
      "invoice_list": {
        "field": "invoice_list",
        "items": {
          "amount": {
            "field": "amount",
            "label": "金额",
            "required": true,
            "type": "Number"
          },
          "attach_list": {
            "field": "attach_list",
            "items": {
              "attach_name": {
                "field": "attach_name",
                "label": "",
                "required": true,
                "type": "String"
              },
              "attach_url": {
                "field": "attach_url",
                "label": "",
                "required": true,
                "type": "String"
              },
              "size": {
                "field": "size",
                "label": "",
                "required": true,
                "type": "Number"
              },
              "thumbnail_url": {
                "field": "thumbnail_url",
                "label": "",
                "required": true,
                "type": "String"
              }
            },
            "label": "发票附件",
            "required": true,
            "type": "Array"
          },
          "check_state": {
            "field": "check_state",
            "label": "查验状态",
            "required": true,
            "type": "Number"
          },
          "invoice_id": {
            "field": "invoice_id",
            "label": "",
            "required": true,
            "type": "String"
          },
          "invoice_type": {
            "field": "invoice_type",
            "label": "",
            "required": true,
            "type": "Number"
          },
          "note": {
            "field": "note",
            "label": "",
            "required": true,
            "type": "String"
          },
          "order_sn": {
            "field": "order_sn",
            "label": "",
            "required": true,
            "type": "String"
          },
          "reimburse_amount": {
            "field": "reimburse_amount",
            "label": "报销金额",
            "required": true,
            "type": "Number"
          },
          "sales_name": {
            "field": "sales_name",
            "label": "",
            "required": true,
            "type": "String"
          },
          "source": {
            "field": "source",
            "label": "",
            "required": true,
            "type": "Number"
          },
          "ticket_code": {
            "field": "ticket_code",
            "label": "",
            "required": true,
            "type": "String"
          },
          "ticket_date": {
            "field": "ticket_date",
            "label": "",
            "required": true,
            "type": "Number"
          },
          "ticket_sn": {
            "field": "ticket_sn",
            "label": "",
            "required": true,
            "type": "String"
          },
          "verify_info": {
            "field": "verify_info",
            "items": {
              "verify_msg": {
                "field": "verify_msg",
                "label": "审核消息",
                "required": true,
                "type": "String"
              },
              "verity_status": {
                "field": "verity_status",
                "label": "审核结果",
                "required": true,
                "type": "Number"
              }
            },
            "label": "智能审核结果",
            "required": true,
            "type": "Array"
          }
        },
        "label": "发票列表",
        "required": true,
        "type": "Array"
      },
      "note": {
        "field": "note",
        "label": "摘要",
        "required": true,
        "type": "String"
      },
      "parent_fee_name": {
        "field": "parent_fee_name",
        "label": "父级费用名称",
        "required": true,
        "type": "String"
      },
      "parent_fee_type": {
        "field": "parent_fee_type",
        "label": "父级费用类型",
        "required": true,
        "type": "Number"
      },
      "total_amount": {
        "field": "total_amount",
        "label": "总金额",
        "required": true,
        "type": "Number"
      }
    }
  }
]

export const res1 = {
  "id": 3501,
  "form_type": 413,
  "view": [
    {
      "component": "commiter",
      "fixed": true,
      "id": 111,
      "order": 0,
      "pid": 0,
      "type": 2
    },
    {
      "component": "reimburseer",
      "fixed": true,
      "id": 222,
      "order": 1,
      "pid": 0,
      "type": 2
    },
    {
      "component": "department",
      "fixed": true,
      "id": 444,
      "order": 2,
      "pid": 0,
      "type": 2
    },
    {
      "component": "title",
      "fixed": true,
      "id": 555,
      "order": 3,
      "pid": 0,
      "type": 2
    },
    {
      "component": "travel_type",
      "id": 1122,
      "order": 4,
      "pid": 0,
      "type": 2
    },
    {
      "component": "summary",
      "fixed": true,
      "id": 1133,
      "order": 5,
      "pid": 0,
      "type": 2
    },
    {
      "component": "custom_attach",
      "id": 1155,
      "order": 7,
      "pid": 0,
      "type": 1
    }
  ],
  "model": [
    {
      "component": "commiter",
      "default_type": "commiter",
      "field": "commiter",
      "id": 111,
      "items": {
        "name": {
          "field": "name",
          "label": "用户名",
          "required": true,
          "type": "String"
        },
        "uid": {
          "field": "uid",
          "label": "用户uid",
          "required": true,
          "type": "Number"
        }
      },
      "label": "提单人",
      "pid": 0,
      "print": true,
      "required": true,
      "tip": "",
      "type": "Object"
    },
    {
      "component": "reimburseer",
      "field": "reimburseer",
      "id": 222,
      "items": {
        "name": {
          "field": "name",
          "label": "用户名",
          "required": true,
          "type": "String"
        },
        "uid": {
          "field": "uid",
          "label": "用户uid",
          "required": true,
          "type": "Number"
        }
      },
      "label": "承担人",
      "pid": 0,
      "print": true,
      "required": true,
      "type": "Object"
    },
    {
      "component": "department",
      "field": "department",
      "id": 444,
      "items": {
        "full_name": {
          "field": "full_name",
          "label": "部门全名",
          "required": true,
          "type": "String"
        },
        "id": {
          "field": "id",
          "label": "部门id",
          "required": true,
          "type": "Number"
        },
        "name": {
          "field": "name",
          "label": "部门名",
          "required": true,
          "type": "String"
        }
      },
      "label": "承担部门",
      "pid": 0,
      "print": true,
      "required": true,
      "tip": "请选择",
      "type": "Object"
    },
    {
      "component": "title",
      "field": "title",
      "id": 555,
      "items": {
        "id": {
          "field": "id",
          "label": "抬头id",
          "required": true,
          "type": "Number"
        },
        "name": {
          "field": "name",
          "label": "抬头名",
          "required": true,
          "type": "String"
        }
      },
      "label": "费用主体",
      "print": true,
      "required": true,
      "tip": "请选择",
      "type": "Object"
    },
    {
      "component": "travel_type",
      "field": "travel_type",
      "id": 1122,
      "items": {},
      "label": "出行类型",
      "pid": 0,
      "print": true,
      "required": true,
      "tip": "请选择",
      "type": "String"
    },
    {
      "component": "summary",
      "field": "summary",
      "id": 1133,
      "items": {},
      "label": "事由",
      "length_limit": 1024,
      "pid": 0,
      "print": true,
      "required": true,
      "tip": "请输入事由",
      "type": "String"
    },
    {
      "component": "travel_list",
      "field": "travel_list",
      "id": 1144,
      "items": {
        "trans_time": {
          "field": "trans_time",
          "items": {
            "duration": {
              "field": "duration",
              "label": "时长",
              "required": true,
              "type": "Number"
            },
            "end_time": {
              "field": "end_time",
              "label": "行程结束时间",
              "required": true,
              "type": "Number"
            },
            "start_time": {
              "field": "start_time",
              "label": "行程开始时间",
              "required": true,
              "type": "Number"
            }
          },
          "label": "时长",
          "type": "Object"
        }
      },
      "label": "行程明细",
      "pid": 0,
      "print": true,
      "required": true,
      "tip": "增加行程",
      "type": "Array"
    },
    {
      "component": "trans_list",
      "date_type": "YY-MM-DD-hh-mm",
      "field": "trans_list",
      "id": 11442,
      "items": {
        "end_point": {
          "field": "end_point",
          "label": "目的地点",
          "required": true,
          "type": "String"
        },
        "start_point": {
          "field": "start_point",
          "label": "开始地点",
          "required": true,
          "type": "String"
        }
      },
      "label": "行程明细-业务控件",
      "pid": 1144,
      "print": true,
      "required": true,
      "type": "Array"
    },
    {
      "component": "trans_way",
      "field": "trans_way",
      "id": 11441,
      "items": {},
      "label": "出行方式",
      "pid": 1144,
      "print": true,
      "required": true,
      "tip": "请选择",
      "type": "String"
    },
    {
      "component": "custom_attach",
      "field": "custom_attach",
      "id": 1155,
      "items": {
        "attach_name": { "field": "attach_name", "type": "String" },
        "attach_url": { "field": "attach_url", "type": "String" },
        "size": { "field": "size", "type": "Number" },
        "thumbnail_url": { "field": "thumbnail_url", "type": "String" }
      },
      "label": "附件",
      "max_filesize": 0,
      "pid": 0,
      "print": false,
      "required": false,
      "type": "Array"
    }
  ]
}

export const res2 = [
  {
    "field": "travel_way",
    "id": 1,
    "label": "打车",
    "value": "打车",
    "order": 0
  },
  {
    "field": "travel_way",
    "id": 2,
    "label": "飞机",
    "value": "飞机",
    "order": 1
  },
  {
    "field": "travel_way",
    "id": 3,
    "label": "火车",
    "value": "火车",
    "order": 2
  },
  {
    "field": "travel_way",
    "id": 4,
    "label": "轮船",
    "value": "轮船",
    "order": 3
  },
  {
    "field": "travel_way",
    "id": 5,
    "label": "其他",
    "value": "其他",
    "order": 4
  },
  {
    "field": "travel_type",
    "id": 6,
    "label": "外地出差",
    "value": "外地出差",
    "order": 5
  },
  {
    "field": "travel_type",
    "id": 7,
    "label": "本地出差",
    "value": "本地出差",
    "order": 6
  },
  {
    "field": "custom_radio_1624083444530",
    "id": 1216,
    "label": "1",
    "value": "1624083550663",
    "order": 7
  },
  {
    "field": "custom_radio_1624083444530",
    "id": 1217,
    "label": "12",
    "value": "1624083556389",
    "order": 8
  }
]