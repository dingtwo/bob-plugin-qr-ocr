/**
 * 由于各大服务商的语言代码都不大一样，
 * 所以我定义了一份 Bob 专用的语言代码，以便 Bob 主程序和插件之间互传语种。
 * Bob 语言代码列表 https://ripperhe.gitee.io/bob/#/plugin/addtion/language
 *
 * 转换的代码建议以下面的方式实现，
 * `xxx` 代表服务商特有的语言代码，请替换为真实的，
 * 具体支持的语种数量请根据实际情况而定。
 *
 * Bob 语言代码转服务商语言代码(以为 'zh-Hans' 为例): var lang = langMap.get('zh-Hans');
 * 服务商语言代码转 Bob 语言代码: var standardLang = langMapReverse.get('xxx');
 */
var items = [
  ['auto', 'xxx'],
  ['zh-Hans', 'xxx'],
  ['zh-Hant', 'xxx'],
  ['en', 'xxx'],
]

var langMap = new Map(items)
var langMapReverse = new Map(items.map(([standardLang, lang]) => [lang, standardLang]))

function supportLanguages() {
  return items.map(([standardLang, lang]) => standardLang)
}

function ocr(query, completion) {
  var secretId = $option.secretId
  var secretKey = $option.secretKey
  var url = $option.url
  $http.request({
    method: 'POST',
    url: url,
    body: {
      image: query.image.toBase64(),
      secretId: secretId,
      secretKey: secretKey,
    },
    header: {
      'Content-Type': 'application/json',
    },
    handler: function (resp) {
      $log.error(resp.data.data)
      if (resp.data.code === 200000) {
        var data = resp.data.data
        completion({
          result: data,
        })
      } else {
        completion({ error: resp.data.msg })
      }
    },
  })
}
