<template>
  <div class="line-chat-container">
    <el-form ref="form" :model="form" label-width="110px">
      <el-form-item label="环境选择：" prop="environment">
        <el-radio-group v-model="form.environment">
          <el-radio label="test">测试环境</el-radio>
          <el-radio label="prod">生产环境</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="" label-width="0">
        <el-col :span="6">
          <el-form-item label="timestamp：" prop="timestamp">
            <el-date-picker v-model="form.date" type="date" placeholder="选择日期" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="pfModelUnite：" prop="pfModelUnite">
            <el-input v-model="form.pfModelUnite" @change="changeVal($event, 1)" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="site：" prop="site">
            <el-input v-model="form.site" class="siteInput" @change="changeVal($event, 2)" />
            <el-button type="primary" size="small" icon="el-icon-view" circle @click="goToLink" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="onSubmit">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <div id="echart-line" />
  </div>
</template>

<script>
import echarts from 'echarts'
import { dateFormat } from '@/utils/date'

export default {
  name: 'LineChart',
  data() {
    return {
      ChatLine: null,
      option: {},
      form: {
        environment: 'test',
        date: new Date(),
        pfModelUnite: '',
        site: ''
      },
      loading: false
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      this.ChatLine = echarts.init(document.getElementById('echart-line'))
      this.option = {
        tooltip: {
          trigger: 'axis',
          position: function(pt) {
            return [pt[0], '10%']
          }
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          }
        },
        yAxis: {
          type: 'value',
          interval: 1,
          min: 0,
          max: 1,
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#DDD'
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#333'
            }
          },
          axisTick: {
            show: false
          },
          nameTextStyle: {
            color: '#999'
          },
          splitArea: {
            show: false
          },
          minorTick: {
            show: true
          },
          minorSplitLine: {
            show: true
          }
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 100
          },
          {
            start: 0,
            end: 100
          }
        ],
        series: [{
          type: 'line',
          data: [],
          lineStyle: {
            normal: {
              width: 4,
              color: {
                type: 'linear',

                colorStops: [{
                  offset: 0,
                  color: '#A9F387' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#48D8BF' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              },
              shadowColor: 'rgba(72,216,191, 0.3)',
              shadowBlur: 10,
              shadowOffsetY: 20
            }
          },
          itemStyle: {
            normal: {
              color: '#fff',
              borderWidth: 4,
              borderColor: '#A9F387'
            }
          },
          smooth: true
        }]
      }
      this.ChatLine.setOption(this.option)
    },
    changeVal(val, type) {
      console.log(val, type)
      if (!val) return
      var arr = []
      var pf = ''
      var model = ''
      if (type === 1) {
        arr = val.split('|')
        if (arr.length !== 2) {
          this.$message.error('pfModelUnite格式错误')
          return
        }
        pf = arr[0]
        model = arr[1]
        this.form.site = `https://${pf}.com/${model}`
      } else {
        arr = val.split('.com/')
        if (arr.length !== 2) {
          this.$message.error('site格式错误')
          return
        }
        pf = arr[0].split('https://')[1]
        model = arr[1]
        // 如果model的最后一个是'/',则去掉
        if (model[model.length - 1] === '/') {
          model = model.slice(0, model.length - 1)
        }
        this.form.pfModelUnite = `${pf}|${model}`
      }
    },
    goToLink() {
      if (this.form.site) {
        window.open(this.form.site)
      }
    },
    onSubmit() {
      var apiObj = {
        test: 'https://test10.lovense.com',
        prod: 'https://surfease.lovense-api.com'
      }
      var api = apiObj[this.form.environment]
      var timestamp = new Date(`${dateFormat(this.form.date, 'yyyy-MM-dd')} 23:59:59`).getTime()
      var url = `${api}/surfease/anon/test1/OnlineStatusQuery?timestamp=${timestamp}&pfModelUnite=${this.form.pfModelUnite}&uuid=12f686aa-1f09-49dc-b871-4e9e0f16138b`
      this.loading = true
      fetch(url)
        .then(response => response.json())
        .then(json => {
          this.loading = false
          var data = json.data.data
          data = data.reverse()
          this.option.xAxis.data = data.map((x) => x.dateFormat)
          this.option.series[0].data = data.map((x) => x.onLineStatus)
          this.ChatLine.setOption(this.option)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.line-chat {
  &-container {
    margin: 20px 60px;
    #echart-line {
      height: 400px;
    }
    .siteInput {
      width: 80%;
    }
  }
}
</style>
