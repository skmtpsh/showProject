const operatorMeta = {
  baskCheckItem: {
    idcard_check: '身份证号码有效性',
    email_check: '邮箱有效性',
    address_check: '地址有效性',
    call_data_check: '通话记录完整性',
    idcard_match: '身份证号码是否与运营商数据匹配',
    name_match: '姓名是否与运营商数据匹配',
    is_name_and_idcard_in_court_black: '申请人姓名+身份证号码是否出现在法院关注名单(Ⅱ类)',
    is_name_and_idcard_in_finance_black: '申请人姓名+身份证号码是否出现在金融机构关注名单(Ⅱ类)',
    is_name_and_mobile_in_finance_black: '申请人姓名+手机号码是否出现在金融机构关注名单(Ⅱ类)',
    mobile_silence_3m: '号码沉默度(近3月)，分数越高用户越不活跃',
    mobile_silence_6m: '号码沉默度(近6月)，分数越高用户越不活跃',
    arrearage_risk_3m: '欠费风险度(近3月)，分数越高风险越高',
    arrearage_risk_6m: '欠费风险度(近6月)，分数越高风险越高',
    binding_risk: '亲情网风险度，分数越高风险越高'
  },
  checkBlackInfo: {
    phone_gray_score: '用户号码联系关注名单综合分数（分数范围0-100，参考分为40，分数越低风险越大）',
    contacts_class1_blacklist_cnt: '直接联系人中关注名单(Ⅱ类)人数',
    contacts_class2_blacklist_cnt: '间接联系人中关注名单(Ⅱ类)人数',
    contacts_class1_cnt: '直接联系人人数',
    contacts_router_cnt: '引起间接关注名单(Ⅱ类)人数',
    contacts_router_ratio: '直接联系人中引起间接关注名单(Ⅱ类)占比'
  },
  checkSearchInfo: {
    searched_org_cnt: '查询过该用户的相关企业数量（姓名+身份证+电话号码）',
    searched_org_type: '查询过该用户的相关企业类型（姓名+身份证+电话号码）',
    idcard_with_other_names: '身份证组合过的其他姓名',
    idcard_with_other_phones: '身份证组合过其他电话',
    phone_with_other_names: '电话号码组合过其他姓名',
    phone_with_other_idcards: '电话号码组合过其他身份证',
    register_org_cnt: '电话号码注册过的相关企业数量',
    register_org_type: '电话号码注册过的相关企业类型',
    arised_open_web: '电话号码出现过的公开信息网站'
  }
}

export default operatorMeta
