<template>
  <div>
    <Row :gutter="10">
      <i-col :md="24" :lg="6" style="margin-bottom: 20px">
        <Card shadow>
          <p slot="title" style="font-size: larger">
            <Icon type="ios-pie"></Icon>
            Linux server
          </p>
          <p style="font-size: small; color: black">
            Total number：{{ this.linux_count }}
          </p>
          <chart-pie3
            style="height: 160px"
            :value="this.LinuxData"
            text="Linux"
          ></chart-pie3>
        </Card>
      </i-col>
      <i-col :md="24" :lg="6" style="margin-bottom: 20px">
        <Card shadow>
          <p slot="title" style="font-size: larger">
            <Icon type="ios-pie"></Icon>
            Oracle database
          </p>
          <p style="font-size: small; color: black">
            total number：{{ this.oracle_count }}
          </p>
          <chart-pie3
            style="height: 160px"
            :value="OracleData"
            text="Oracle"
          ></chart-pie3>
        </Card>
      </i-col>
      <i-col :md="24" :lg="6" style="margin-bottom: 20px">
        <Card shadow>
          <p slot="title" style="font-size: larger">
            <Icon type="ios-pie"></Icon>
            MySQL database
          </p>
          <p style="font-size: small; color: black">
            Total number：{{ this.mysql_count }}
          </p>
          <chart-pie3
            style="height: 160px"
            :value="MysqlData"
            text="MySQL"
          ></chart-pie3>
        </Card>
      </i-col>
      <i-col :md="24" :lg="6" style="margin-bottom: 20px">
        <Card shadow>
          <p slot="title" style="font-size: larger">
            <Icon type="ios-pie"></Icon>
            Redis
          </p>
          <p style="font-size: small; color: black">
            Total number：{{ this.redis_count }}
          </p>
          <chart-pie3
            style="height: 160px"
            :value="RedisData"
            text="Redis"
          ></chart-pie3>
        </Card>
      </i-col>
      <i-col span="12">
        <card>
          <p slot="title" style="font-size: larger">
            <Icon type="ios-warning"></Icon>
            Alarm message
          </p>
          <Scroll>
            <List>
              <ListItem v-for="info in alarminfoList" :key="info.id">
                <ListItemMeta
                  :title="info.alarm_header"
                  :description="info.alarm_content"
                />
              </ListItem>
            </List>
          </Scroll>
        </card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import { CountTo } from '_c/count-to'
import { ChartPie, ChartBar, ChartPie3 } from '_c/charts'
import { getAlarmInfo } from '@/api/system'
import { getLinuxStatList } from '@/api/linux'
import { getOracleStatList } from '@/api/oracle'
import { getMysqlStatList } from '@/api/mysql'
import { getRedisStatList } from '@/api/redis'
import { statuscheck } from '@/libs/tools'

export default {
  name: 'home',
  components: {
    CountTo,
    ChartPie,
    ChartBar,
    ChartPie3
  },
  data () {
    return {
      LinuxData: [],
      OracleData: [],
      MysqlData: [],
      RedisData: [],
      alarminfoList: [],
      linuxstatList: [],
      oraclestatList: [],
      mysqlstatList: [],
      alarm_count: null,
      linux_count: null,
      oracle_count: null,
      mysql_count: null,
      redis_count: null
    }
  },
  created () {
    this.get_alarm_info()
    this.get_linux_stat_list()
    this.get_oracle_stat_list()
    this.get_mysql_stat_list()
    this.get_redis_stat_list()
    this.timer = setInterval(() => {
      this.get_alarm_info()
      this.get_linux_stat_list()
      this.get_oracle_stat_list()
      this.get_mysql_stat_list()
      this.get_redis_stat_list()
    }, 1000 * 20)
  },
  methods: {
    get_alarm_info (parameter) {
      getAlarmInfo(parameter)
        .then((res) => {
          this.alarminfoList = res.data.results
          this.alarm_count = res.data.count
          console.log(this.alarminfoList)
        })
        .catch((err) => {
          this.$Message.error(`Error accessing the alarm information ${err}`)
        })
    },
    get_linux_stat_list (parameter) {
      getLinuxStatList(parameter)
        .then((res) => {
          this.linuxstatList = res.data.results
          this.linux_count = res.data.count
          this.LinuxData = statuscheck(this.linuxstatList)
          console.log(this.linux_stat_list)
        })
        .catch((err) => {
          this.$Message.error(`For Linux error status list ${err}`)
        })
    },
    get_oracle_stat_list (parameter) {
      getOracleStatList(parameter)
        .then((res) => {
          this.oraclestatList = res.data.results
          this.oracle_count = res.data.count
          this.OracleData = statuscheck(this.oraclestatList)
          console.log(this.data)
        })
        .catch((err) => {
          this.$Message.error(`Access to the oracle error status list ${err}`)
        })
    },
    get_mysql_stat_list (parameter) {
      getMysqlStatList(parameter)
        .then((res) => {
          this.mysqlstatList = res.data.results
          this.mysql_count = res.data.count
          this.MysqlData = statuscheck(this.mysqlstatList)
          console.log(this.data)
        })
        .catch((err) => {
          this.$Message.error(`Access to the mysql error status list ${err}`)
        })
    },
    get_redis_stat_list (parameter) {
      getRedisStatList(parameter)
        .then((res) => {
          this.redisstatList = res.data.results
          this.redis_count = res.data.count
          this.RedisData = statuscheck(this.redisstatList)
          console.log(this.data)
        })
        .catch((err) => {
          this.$Message.error(`To obtain a list redis state error ${err}`)
        })
    }
  },
  mounted () {
    //
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less">
.count-style {
  font-size: 50px;
}
</style>
