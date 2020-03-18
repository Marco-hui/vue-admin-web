<template>
  <div class="home-container">
    <div class="clearfix"><i class="el-icon-s-fold fr" @click="openDrawer" /></div>
    <div class="section">
      <el-card class="box-card" style="margin-bottom: 20px;">
        <div slot="header" class="clearfix">
          <span>Cards</span>
          <el-button style="float: right; padding: 3px 0" type="text">View all cards</el-button>
        </div>
        <el-row :gutter="50" class="section-content">
          <el-col :span="8">
            <div class="content-card" />
          </el-col>
          <el-col :span="8">
            <div class="content-card" />
          </el-col>
          <el-col :span="8">
            <div class="content-card last">
              <i class="el-icon-circle-plus-outline" />
              <span>Add New Card</span>
            </div>
          </el-col>
        </el-row>
      </el-card>

      <el-row :gutter="50" class="section-content">
        <el-col :span="8">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>Main Services</span>
              <el-button style="float: right; padding: 3px 0" type="text">view all</el-button>
            </div>
            <el-card v-for="o in 6" :key="o" shadow="always" class="fl content2-card">
              <span>ABC</span>
            </el-card>
          </el-card>
        </el-col>
        <el-col :span="16">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>Current</span>
              <el-button style="float: right; padding: 3px 0" type="text">view all</el-button>
            </div>
            <div v-for="o in 3" :key="o" class="text item">
              <el-row :gutter="20">
                <el-col :span="6">12345678910</el-col>
                <el-col :span="12" style="text-align:center;">---------------------------</el-col>
                <el-col :span="6">$2000.00</el-col>
              </el-row>
            </div>
          </el-card>
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>Savings</span>
              <el-button style="float: right; padding: 3px 0" type="text">view all</el-button>
            </div>
            <div id="echart-line" />
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-drawer
      :visible.sync="drawerShow"
      direction="rtl"
      size="25%"
    >
      <div class="content">
        <div class="header clearfix">
          <el-badge is-dot class="fl">
            <i class="el-icon-bell" />
          </el-badge>
          <div class="fr">
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
                <i class="el-icon-star-on" />
              </el-col>
              <el-col :span="12">
                <span>Dribble Plan</span>
              </el-col>
              <el-col :span="6">
                <span>-$100</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <i class="el-icon-star-on" />
              </el-col>
              <el-col :span="12">
                <span>Dribble Plan</span>
              </el-col>
              <el-col :span="6">
                <span>-$100</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <i class="el-icon-star-on" />
              </el-col>
              <el-col :span="12">
                <span>Dribble Plan</span>
              </el-col>
              <el-col :span="6">
                <span>-$100</span>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="button">
          <el-button type="danger" round>Transfer Money ——></el-button>
        </div>
        <el-button class="button-folder fr" type="primary" icon="el-icon-folder" circle />
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import echarts from 'echarts'

export default {
  name: 'Home',
  data() {
    return {
		  drawerShow: false,
		  WeekTime: 0
    }
  },
  computed: {
    ...mapGetters([
		  'name',
		  'avatar'
    ])
  },
  mounted() {
  	this.initEchartLine()
  },
  methods: {
    openDrawer() {
		  this.drawerShow = true
		  this.$nextTick(() => {
        this.initEchartPie()
		  })
    },
    initEchartPie() {
		  var myChartPie = echarts.init(document.getElementById('echart-pie'))
		  console.log(myChartPie)
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
                show: true,
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
      var myChartLine = echarts.init(document.getElementById('echart-line'))
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [{
          type: 'category',
          data: ['2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06'],
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          }
        }],
        yAxis: [{
          type: 'value',
          splitNumber: 4,
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
          data: [23, 60, 20, 36, 23, 85],
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
		}
	}
</style>

<style lang="scss" scoped>
.home {
  &-container {
		i.el-icon-s-fold{font-size:30px;cursor:pointer;}
		margin: 10px 20px;
		.section{
			.section-header{
				line-height: 40px;
				.title{font-size:16px;color:#000;font-weight:bold;}
				.option{font-size:12px;color:#666;}
			}
			.section-content{
				.content-card{
					height:150px;background: #f60;border-radius:30px;
					&.last{
						background: #eee;text-align: center;line-height: 150px;
						.el-icon-circle-plus-outline{font-size:20px;}
					}
				}
				.content2-card{
					width:45%;height:115px;margin-bottom: 10px;text-align: center;line-height: 75px;
					&:nth-child(2n){margin-left: 10px;}
				}
			}
			#echart-line{width:100%;height:200px;}
		}
		.el-drawer{
		  .content{
				padding:20px;
				.header{
				  i.el-icon-bell{font-size:30px;}
				  .name{line-height: 40px;vertical-align: middle;}
				  .el-avatar{vertical-align: middle;}
				}
				#echart-pie{margin:0 auto;}
				.data-item{
					.tip{
						margin-bottom: 10px;
						.el-input{width:50%;}
					}
					.item .el-row{margin-bottom: 15px;}
				}
				.button .el-button{display: block; margin:20px auto;}
		  }
		}
  }
}
</style>
