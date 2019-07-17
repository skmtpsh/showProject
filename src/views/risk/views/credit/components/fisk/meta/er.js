const erMetaArr = [
  {key: 'riskErIsCalllog', value: '输入手机号是否与本机号码一致', isMeta: true, order: 100, isShow: true},
  {key: 'riskErDirecCellNum', value: '通讯录号码的个数', isMeta: false, order: 200, isShow: true},
  {key: 'riskErCurIdGidNum', value: '身份证号关联的设备数量', isMeta: false, order: 300, isShow: true},
  {key: 'riskErIdGidNum', value: '设备关联身份证号关联的设备数量', isMeta: false, order: 400, isShow: true},
  // 需要确认 v3.3
  {key: 'riskErCityVer', value: '设备是否在常驻城市进行申请', isMeta: true, order: 500, isShow: true},

  {key: 'riskErLinkcellDirec', value: '填写联系人是否在通讯录中', isMeta: true, order: 600, isShow: true},
  {key: 'riskErCurCellGidNum', value: '手机号关联的设备数量', isMeta: false, order: 700, isShow: true},
  {key: 'riskErCellNum', value: '设备关联的手机号数量', isMeta: false, order: 800, isShow: true},
  {key: 'riskErHomeHaddrDist', value: '输入家庭地址距离差验证', isMeta: false, order: 900, isShow: true},
  {key: 'riskErIdNum', value: '设备关联的身份证号数量', isMeta: false, order: 1000, isShow: true},
  {key: 'riskErCurMailGidNum', value: '邮箱关联的设备数量', isMeta: false, order: 1200, isShow: true},
  {key: 'riskErPlatMailNum', value: '该设备本平台关联的邮箱数量', isMeta: false, order: 1300, isShow: true},
  {key: 'riskErBizBaddrDist', value: '输入工作地址距离差验证', isMeta: false, order: 1400, isShow: true},
  {key: 'riskErCellNum', value: '设备关联的手机号数量', isMeta: false, order: 1500, isShow: true},
  {key: 'riskErId2GidNum', value: '身份证号（二度关联）关联设备数', isMeta: false, order: 1600, isShow: true},
  {key: 'riskErPlatIdGidNum', value: '该设备本平台关联身份证号关联的设备数量', isMeta: false, order: 1700, isShow: true},
  {key: 'riskErBankIdNum', value: '设备关联的银行卡号数量', isMeta: false, order: 1900, isShow: true},
  {key: 'riskErCell2GidNum', value: '手机号（二度关联）关联设备数', isMeta: false, order: 1900, isShow: true},
  {key: 'riskErPlatCellGidNum', value: '该设备本平台关联手机号关联的设备数量', isMeta: false, order: 2000, isShow: true},
  {key: 'riskErBizDist', value: '申请地址与实际工作地址距离差验证', isMeta: false, order: 2100, isShow: true},
  {key: 'riskErMailNum', value: '设备关联的邮箱数量', isMeta: false, order: 2200, isShow: true},
  {key: 'riskErMail2GidNum', value: '邮箱（二度关联）关联设备数', isMeta: false, order: 2300, isShow: true},
  {key: 'riskErPlatMailGidNum', value: '该设备本平台关联邮箱关联的设备数量', isMeta: false, order: 2400, isShow: true},
  {key: 'riskErHaddrDist', value: '申请地址与输入家庭地址距离差验证', isMeta: false, order: 2500, isShow: true},

  {key: 'riskErIdGidNum', value: '设备关联身份证号关联的设备数量', isMeta: false, order: 2700, isShow: true},
  {key: 'riskErPlatBankIdNum', value: '该设备本平台关联的银行卡号数量', isMeta: false, order: 2800, isShow: true},
  {key: 'riskErBaddrDist', value: '申请地址与输入工作地址距离差验证', isMeta: false, order: 2900, isShow: true},
  {key: 'riskErBizAddrNum', value: '设备关联的公司地址数量', isMeta: false, order: 3000, isShow: true},
  {key: 'riskErCellGidNum', value: '设备关联手机号关联的设备数量', isMeta: false, order: 3200, isShow: true},
  {key: 'riskErPlatBizAddrNum', value: '该设备本平台关联的公司地址数量', isMeta: false, order: 3300, isShow: true},
  {key: 'riskErIpCellCity', value: '手机归属地和设备申请是否在同一个城市', isMeta: true, order: 3400, isShow: true},
  {key: 'riskErHomeAddrNum', value: '设备关联的家庭地址数量', isMeta: false, order: 3500, isShow: true},
  {key: 'riskErMailGidNum', value: '设备关联邮箱关联的设备数量', isMeta: false, order: 3600, isShow: true},
  {key: 'riskErPlatHomeAddrNum', value: '该设备本平台关联的家庭地址数量', isMeta: false, order: 3700, isShow: true},
  // 需要确认 v3.3
  {key: 'riskErIsHhiscity', value: '设备当次申请城市是否与历史申请城市一致', isMeta: true, order: 3800, isShow: true},
  {key: 'riskErCityNum', value: '设备申请的城市数量', isMeta: false, order: 3900, isShow: true}

]
const erMetaTabArr = [
  // table
  {key: 'riskErTotMins', value: '总通话时长', isMeta: false, order: 4000, isShow: true, showType: 'isTable'},
  {key: 'riskErCallerAllnum', value: '主叫次数', isMeta: false, order: 4100, isShow: true, showType: 'isTable'},
  {key: 'riskErCallerNum', value: '主叫被接通次数', isMeta: false, order: 4100, isShow: true, showType: 'isTable'},
  {key: 'riskErCalleeAllnum', value: '被叫次数', isMeta: false, order: 4100, isShow: true, showType: 'isTable'},
  {key: 'riskErCalleeNum', value: '被叫被接通次数', isMeta: false, order: 4100, isShow: true, showType: 'isTable'},
  {key: 'riskErNonameCallerAllnum', value: '无姓名的主叫次数', isMeta: false, order: 4200, isShow: true, showType: 'isTable'},
  {key: 'riskErNonameCallerNum', value: '无姓名主叫接通次数', isMeta: false, order: 4300, isShow: true, showType: 'isTable'},
  {key: 'riskErNonameCalleeNum', value: '无姓名被叫接通次数', isMeta: false, order: 4400, isShow: true, showType: 'isTable'},
  {key: 'riskErNonameCalleeAllnum', value: '无姓名的被叫次数', isMeta: false, order: 4500, isShow: true, showType: 'isTable'},
  {key: 'riskErTotPeop', value: '总有效联系人数', isMeta: false, order: 4600, isShow: true, showType: 'isTable'},
  {key: 'riskErNightNum', value: '夜间通话次数', isMeta: false, order: 4700, isShow: true, showType: 'isTable'},
  {key: 'riskErNightMins', value: '夜间通话时长', isMeta: false, order: 4800, isShow: true, showType: 'isTable'},
  {key: 'riskErNightPeop', value: '夜间有效联系人数', isMeta: false, order: 4900, isShow: true, showType: 'isTable'},
  {key: 'riskErMaxNocontDay', value: '连续无通话的最大间隔天数', isMeta: false, order: 5100, isShow: true, showType: 'isTable'},
  {key: 'riskErLtimeNocontNum', value: '连续≥5天无通话的次数', isMeta: false, order: 5200, isShow: true, showType: 'isTable'},
  {key: 'riskErContLinkmanNum', value: '与客户填写的联系人通话次数', isMeta: false, order: 5300, isShow: true, showType: 'isTable'}
]
const erMetaTabTopArr = [
  // tabl'isTable'p5
  {key: 'riskErCallerCitys', value: '呼出次数最多的城市（top3）', isMeta: false, order: 6000, isShow: true, showType: 'isTableTop'},
  {key: 'riskErCalleeCitys', value: '呼入次数最多的城市（top3）', isMeta: false, order: 6100, isShow: true, showType: 'isTableTop'},
  {key: 'riskErIsUsualCaller', value: '常主叫号码（top5）是否在通讯录中', isMeta: true, order: 6200, isShow: true, showType: 'isTableTop'},
  {key: 'riskErUsualCallerNum', value: '常主叫号码（top5）通话次数', isMeta: false, order: 6300, isShow: true, showType: 'isTableTop'},
  {key: 'riskErIsUsualCallee', value: '常被叫号码（top5）是否在通讯录中', isMeta: true, order: 6400, isShow: true, showType: 'isTableTop'},
  {key: 'riskErUsualCalleeNum', value: '常被叫号码（top5）通话次数', isMeta: false, order: 6500, isShow: true, showType: 'isTableTop'}
]
export default {
  erMetaArr,
  erMetaTabTopArr,
  erMetaTabArr
}
