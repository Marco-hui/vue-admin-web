<template>
  <div class="home-container">
    <div class="drawerIcon clearfix"><i class="el-icon-s-fold fr" @click="openDrawer" /></div>
    <div class="section">
      <div class="section-header clearfix">
        <div class="title fl">Cards-change</div>
        <div class="option fr">View all cards</div>
      </div>
      <el-row :gutter="20" class="section-content mgb50">
        <el-col :span="8">
          <div class="content-card c1">
            <div class="top">Available balance</div>
            <div class="amount">$ {{ AmountFormat(2200, 2, ',') }}</div>
            <div class="cardnumber">{{ CardNumberFormat('6217003130008765288') }}</div>
            <div class="label">Monzo</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="content-card c2">
            <div class="top">Available balance</div>
            <div class="amount">$ {{ AmountFormat(1300.89, 2, ',') }}</div>
            <div class="cardnumber">{{ CardNumberFormat('6217003130008765267') }}</div>
            <div class="label">Monzo</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="content-card last">
            <i class="el-icon-circle-plus-outline" />
            <span>Add New Card</span>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="8">
          <div class="section-header clearfix">
            <div class="title fl">Main Services</div>
            <div class="option fr">View all</div>
          </div>
          <div class="section-content s2">
            <el-card v-for="item in services" :key="item.name" shadow="always" class="fl content2-card">
              <i :class="item.icon" />
              <span>{{ item.name }}</span>
            </el-card>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="right-section-top">
            <div class="section-header clearfix">
              <div class="title fl">Current</div>
              <div class="option fr">View all</div>
            </div>
            <div class="section-content">
              <el-row v-for="o in 3" :key="o" :gutter="20" class="current">
                <el-col :span="6">12345678910</el-col>
                <el-col :span="12" class="b_line">&nbsp;</el-col>
                <el-col :span="6" class="amount">$ {{ AmountFormat(2222.77, 2, ',') }}</el-col>
              </el-row>
            </div>
          </div>
          <div class="right-section-bottom">
            <div class="section-header clearfix">
              <div class="title fl">Savings</div>
              <div class="option fr">View all</div>
            </div>
            <div class="section-content clearfix">
              <div id="echart-line" class="fl" />
              <div class="fr echart-data">
                <el-row>
                  <el-col :span="12" class="label">Total</el-col>
                  <el-col :span="12" class="amount">$ {{ AmountFormat(2222.77, 2, ',') }}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" class="label">This week</el-col>
                  <el-col :span="12" class="amount">$ {{ AmountFormat(6222.77, 2, ',') }}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" class="label">This month</el-col>
                  <el-col :span="12" class="amount">$ {{ AmountFormat(12222.77, 2, ',') }}</el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-drawer
      :visible.sync="drawerShow"
      :with-header="false"
      :show-close="false"
      direction="rtl"
      size="25%"
    >
      <div class="content">
        <div class="header">
          <el-badge is-dot class="badge">
            <i class="el-icon-bell" />
          </el-badge>
          <div class="avatar">
            <span class="name">{{ name }}</span>
            <el-avatar :src="avatar+'?imageView2/1/w/80/h/80'" />
          </div>
        </div>
        <div id="echart-pie" style="width: 200px;height:200px;" />
        <div class="data-item">
          <div class="clearfix tip">
            <div class="fl" style="line-height:40px;font-size:12px;color:#666;">Transactions</div>
            <el-select v-model="WeekTime" class="fr">
              <el-option label="Today" :value="0" />
              <el-option label="Yesterday" :value="1" />
            </el-select>
          </div>
          <div class="item">
            <el-row :gutter="20">
              <el-col :span="6">
                <i class="el-icon-basketball" />
              </el-col>
              <el-col :span="12">
                <span>Dribble Plan</span>
              </el-col>
              <el-col :span="6">
                <span class="amount">-$100</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <i class="el-icon-potato-strips" />
              </el-col>
              <el-col :span="12">
                <span>Dribble Plan</span>
              </el-col>
              <el-col :span="6">
                <span class="amount">+$110</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <i class="el-icon-grape" />
              </el-col>
              <el-col :span="12">
                <span>Dribble Plan</span>
              </el-col>
              <el-col :span="6">
                <span class="amount">-$120</span>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="button">
          <el-button type="danger" round>Transfer Money —></el-button>
        </div>
        <el-button class="button-folder fr" type="primary" icon="el-icon-folder" circle />
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { amountFormat, cardNumberFormat } from '@/utils'
import echarts from 'echarts'

export default {
  name: 'Home',
  data() {
    return {
      drawerShow: false,
      WeekTime: 0,
      services: [
        { icon: 'el-icon-sort', name: 'Transactions' },
        { icon: 'el-icon-magic-stick', name: 'Utility' },
        { icon: 'el-icon-wallet', name: 'Loans' },
        { icon: 'el-icon-bank-card', name: 'Deposits' },
        { icon: 'el-icon-time', name: 'Fast transfer' },
        { icon: 'el-icon-connection', name: 'Exchangs' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar'
    ])
  },
  mounted() {
    console.log('remove test')
    this.initEchartLine()
  },
  methods: {
    AmountFormat(number, decimals, thousands_sep) {
      return amountFormat(number, decimals, thousands_sep)
    },
    CardNumberFormat(cardNumber) {
      return cardNumberFormat(cardNumber)
    },
    openDrawer() {
      this.drawerShow = true
      this.$nextTick(() => {
        this.initEchartPie()
      })
    },
    initEchartPie() {
      var myChartPie = echarts.init(document.getElementById('echart-pie'))
      var option = {
        title: {
          text: '$5,349',
          subtext: 'Balance',
          x: 'center',
          y: 'center',
          textStyle: {
            fontSize: 20,
            fontWeight: 'normal',
            color: ['#333']
          },
          subtextStyle: {
            color: '#666',
            fontSize: 12
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '14',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ]
          }
        ]
      }
      myChartPie.setOption(option)
    },
    initEchartLine() {
      console.log('start chart')
      var myChartLine = echarts.init(document.getElementById('echart-line'))
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [{
          type: 'category',
          data: ['$10', '$20', '$30', '$40', '$50'],
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          }
        }],
        yAxis: [{
          type: 'value',
          interval: 25,
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
          }
        }],
        series: [{
          name: '课时',
          type: 'line',
          data: [23, 60, 36, 23, 85],
          lineStyle: {
            normal: {
              width: 8,
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
              borderWidth: 10,
              borderColor: '#A9F387'
            }
          },
          smooth: true
        }]
      }
      myChartLine.setOption(option)
    }
  }
}
</script>
<style lang="scss">
	.tip{
		.el-select{
			width:115px;
      .el-input__inner{border: 0 none;}
		}
	}
</style>

<style lang="scss" scoped>
.home {
  &-container {
		margin: 20px 60px;
    .drawerIcon{
      margin-bottom: 10px;
      i.el-icon-s-fold{font-size:30px;cursor:pointer;}
    }
		.section{
      .mgb50{margin-bottom: 50px;}
			.section-header{
				line-height: 60px;
				.title{font-size:16px;color:#000;font-weight:bold;}
				.option{font-size:12px;color:#A7A9B1;cursor:pointer;}
			}
			.section-content{
				.content-card{
					height:170px;background: #FF4D56;border-radius:20px;padding:25px;
          .top{fontSize: 12px;color: #E22F39;margin-bottom: 10px;}
          .amount{font-size: 18px;color: #fff;margin-bottom: 30px;}
          .cardnumber{color: #E22F39;margin-bottom: 10px;}
          .label{font-size: 18px;color: #fff;}
          &.c2{
            background: #0E809A;
            .top, .cardnumber{color: #084A57;}
          }
          &.last{
            background: #F8F8F8;text-align: center;display: flex;flex-direction: column;justify-content: center;cursor:pointer;
            .el-icon-circle-plus-outline{font-size:45px;color: #D7D7D7;margin-bottom: 10px;}
            span{color:#9799A2; font-size: 14px;}
          }
				}
				.content2-card{
          width:47%;height:130px;margin-bottom: 10px;border-radius: 30px;
					&:nth-child(2n){margin-left: 15px;}
          /deep/ .el-card__body{
            height: 100%;text-align: center;display: flex;flex-direction: column;justify-content: center;
            i{font-size:30px;color:#FF4D56;margin-bottom: 20px;}
            span{font-size:12px;color:#15243D;}
          }
				}
        .current{
          color: #BCBDC4;margin-bottom: 15px;
          .b_line{border-bottom: 1px dashed #BCBDC4;}
          .amount{text-align: right;color:#14233C;font-weight: bold;}
        }
        .echart-data{
          width:220px;line-height: 40px;margin-top: 40px;
          .label{color:#ABADB5;}
          .amount{text-align: right;color:#14233C;font-weight: bold;}
        }
			}
			#echart-line{
        width:60%;height:300px;
      }
		}
		.el-drawer{
      .content{
				padding:30px;background: #FcFcFc;
				.header{
          display:flex;justify-content:space-between;align-items: center;
          i.el-icon-bell{font-size:25px;color:#999BA4;}
          .name{line-height: 40px;vertical-align: middle;}
          .el-avatar{vertical-align: middle;}
				}
				#echart-pie{margin:0 auto;}
				.data-item{
					.tip{
						margin-bottom: 10px;color:#D7D8DB;
						.el-input{width:50%;}
					}
					.item .el-row{
            margin-bottom: 10px;
            .el-col{line-height: 45px;}
            i{display: block;width:45px;height:45px;text-align: center;line-height: 45px;background: #FFFFFF;border-radius:10px;font-size: 30px;color:#FF4D56;}
            .amount{color:#FF4D56;}
          }
				}
				.button .el-button{display: block; margin:20px auto;}
      }
		}
  }
}
</style>
