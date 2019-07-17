const egMetaArr = [
  {key: 'riskEgGroupctrl', value: '设备当次是否使用群控系统', isMeta: true, order: 100, isShow: true},
  {key: 'riskEgIp', value: '设备当次采集的IP地址', isMeta: true, order: 200, isShow: true},
  {key: 'riskEgGps', value: '设备当次事件发生的位置', isMeta: true, order: 300, isShow: true},
  {key: 'riskEgAddr', value: '设备当次事件发生的省市', isMeta: true, order: 400, isShow: true}
]
const egMetaTabTopArr = [
  {key: 'riskEgGroupfraud', value: '设备群体申请次数', isMeta: true, order: 500, isShow: true, showType: 'isTableTop'}
]
const egMetaTabArr = [
  {key: 'riskEgIpNum', value: '设备关联的ip数量', isMeta: true, order: 700, isShow: true, showType: 'isTable'},
  {key: 'riskEgUidNum', value: '设备关联的平台账号数', isMeta: true, order: 700, isShow: true, showType: 'isTable'},
  {key: 'riskEgIpOperNum', value: 'IP操作总次数', isMeta: true, order: 700, isShow: true, showType: 'isTable'},
  {key: 'riskEgUidGidNum', value: '平台账号（仅限该平台）关联的设备数量', isMeta: true, order: 700, isShow: true, showType: 'isTable'},
  {key: 'riskEgUidIpNum', value: '平台账号（仅限该平台）关联的IP数', isMeta: true, order: 700, isShow: true, showType: 'isTable'},
  {key: 'riskEgIpGidNum', value: 'gid关联IP关联设备数量', isMeta: true, order: 600, isShow: true, showType: 'isTable'},
  {key: 'riskEgWifiGidNum', value: 'gid关联wifi关联设备数量', isMeta: true, order: 700, isShow: true, showType: 'isTable'}
]
export default {
  egMetaArr,
  egMetaTabTopArr,
  egMetaTabArr
}
