const ebMetaArr = [
  {key: 'riskEblendper', value: '设备最近两次借款时间间隔（秒）', isMeta: false, order: 100, isShow: true},
  {key: 'riskEbregper', value: '设备最近两次注册时间间隔（秒）', isMeta: false, order: 200, isShow: true},
  {key: 'riskEbcollecinfo', value: '设备当次采集的时间和事件类型', isMeta: false, order: 300, isShow: true, isTranslate: true},
  {key: 'riskEbplatlendsigper', value: '设备上本平台内最近一次借款距前一次登录时间间隔（秒）', isMeta: false, order: 400, isShow: true},
  {key: 'riskEbplatsigregper', value: '设备上本平台内最近一次登录距前一次注册时间间隔（秒）', isMeta: false, order: 400, isShow: true}
]
const ebMetaTabTopArr = [
  {key: 'riskEboperper', value: '设备最近操作的时间间隔（秒）', isMeta: false, order: 500, isShow: true, showType: 'isTableTop'},
  {key: 'riskEbMoveDist', value: '设备最近操作的距离间隔（公里）', isMeta: false, order: 600, isShow: true, showType: 'isTableTop'}
]
const ebMetaTabArr = [
  {key: 'riskEbnightoprnum', value: '设备夜间操作次数', isMeta: false, order: 700, isShow: true, showType: 'isTable'},
  {key: 'riskEblendnum', value: '设备借款次数', isMeta: false, order: 700, isShow: true, showType: 'isTable'},
  {key: 'riskEbregisternum', value: '设备注册次数', isMeta: false, order: 700, isShow: true, showType: 'isTable'},
  {key: 'riskEbloginnum', value: '设备登录次数', isMeta: false, order: 700, isShow: true, showType: 'isTable'},
  {key: 'riskEbcashnum', value: '设备提现次数', isMeta: false, order: 700, isShow: true, showType: 'isTable'},
  {key: 'riskEbmarketnum', value: '设备营销次数', isMeta: false, order: 700, isShow: true, showType: 'isTable'},
  {key: 'riskEblendbanknum', value: '设备在银行机构的借款次数', isMeta: false, order: 700, isShow: true, showType: 'isTable'},
  {key: 'riskEblendnbanknum', value: '设备在非银机构的借款次数', isMeta: false, order: 700, isShow: true, showType: 'isTable'},

  {key: 'riskEblendnsloannum', value: '设备在持牌网络小贷机构的借款次数', isMeta: false, order: 700, isShow: true, showType: 'isTable'},
  {key: 'riskEblendautofinnum', value: '设备在持牌汽车金融机构的借款次数', isMeta: false, order: 600, isShow: true, showType: 'isTable'},
  {key: 'riskEblendsloannum', value: '设备在持牌小贷机构的借款次数', isMeta: false, order: 700, isShow: true, showType: 'isTable'},
  {key: 'riskEblendconsnum', value: '设备在持牌消费金融机构的借款次数', isMeta: false, order: 700, isShow: true, showType: 'isTable'},
  {key: 'riskEblendfinleanum', value: '设备在持牌融资租赁机构的借款次数', isMeta: false, order: 700, isShow: true, showType: 'isTable'},
  {key: 'riskEblendelsenum', value: '设备在其它类的借款次数', isMeta: false, order: 700, isShow: true, showType: 'isTable'},

  {key: 'riskEblendorgnum', value: '设备借款机构数', isMeta: false, order: 700, isShow: true, showType: 'isTable'},
  {key: 'riskEblendbankorgnum', value: '设备在银行机构的借款机构数', isMeta: false, order: 700, isShow: true, showType: 'isTable'},
  {key: 'riskEblendnbankorgnum', value: '设备在非银行机构的借款机构数', isMeta: false, order: 700, isShow: true, showType: 'isTable'},
  {key: 'riskEblendnsloanorgnum', value: '设备在持牌网络小贷机构的借款机构数', isMeta: false, order: 700, isShow: true, showType: 'isTable'},
  {key: 'riskEblendautofinorgnum', value: '设备在持牌汽车金融机构的借款机构数', isMeta: false, order: 700, isShow: true, showType: 'isTable'},
  {key: 'riskEblendsloanorgnum', value: '设备在持牌小贷机构的借款机构数', isMeta: false, order: 700, isShow: true, showType: 'isTable'},
  {key: 'riskEblendconsorgnum', value: '设备在持牌消费金融机构的借款机构数', isMeta: false, order: 700, isShow: true, showType: 'isTable'},
  {key: 'riskEblendfinleaorgnum', value: '设备在持牌融资租赁机构的借款机构数', isMeta: false, order: 700, isShow: true, showType: 'isTable'},
  {key: 'riskEblendelseorgnum', value: '设备在其它类的借款机构数', isMeta: false, order: 700, isShow: true, showType: 'isTable'},
  {key: 'riskEborgnum', value: '设备关联的机构数', isMeta: false, order: 700, isShow: true, showType: 'isTable'}
]

export default {
  ebMetaArr,
  ebMetaTabTopArr,
  ebMetaTabArr
}
