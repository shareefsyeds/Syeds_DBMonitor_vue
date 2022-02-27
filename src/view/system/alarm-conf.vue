<template>
  <Row>
    <Card>
      <Row>
        <Button @click="add"
                v-if="addAccessAll"
                type="primary">add</Button>&nbsp;
        <Input v-model="alarm_name_search"
               placeholder="The alarm name"
               style="width: 100px" />&nbsp;
        <Button @click="search"
                type="primary">search</Button>&nbsp;
        <Button @click="clear_search"
                type="success">The refresh</Button>
      </Row>
      <br>
      <Row>
        <Table border
               :columns="columns"
               :data="data">

        </Table>
      </Row>
      <Row>
        <br>
        <Page :total="count"
              :page_size='page_size'
              @on-change="get_alert_conf_parameter"
              show-elevator
              show-total />
      </Row>
      <Row>
        <Drawer title="Alarm configuration"
                v-model="create"
                width="720"
                :mask-closable="this.close"
                :styles="styles">
          <Form ref="formData"
                :model="formData"
                :rules="ruleValidate">
            <Alert show-icon>Basic information</Alert>
            <Row :gutter="32">
              <Col span="6">
              <FormItem label="The alarm types"
                        label-position="top"
                        prop="type">
                <Select v-model="formData.type"
                        placeholder="">
                  <Option value='1'>Oracle database</Option>
                  <Option value='2'>MySQL database</Option>
                  <Option value='3'>Redis</Option>
                  <Option value='4'>LInux host</Option>
                </Select>
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="The alarm name"
                        label-position="top"
                        prop="name">
                <Input v-model="formData.name"
                             placeholder="The alarm name">
                </Input>
              </FormItem>
              </Col>
            </Row>
            <Alert show-icon>Threshold & configuration tables</Alert>
            <Row :gutter="32">
              <Col span="4">
              <FormItem label="The operator"
                        label-position="top"
                        prop="judge">
                <Input v-model="formData.judge"
                             placeholder="The operator">
                </Input>
              </FormItem>
              </Col>
              <Col span="6">
              <FormItem label="The alarm threshold"
                        label-position="top"
                        prop="judge_value">
                <Input v-model="formData.judge_value"
                             placeholder="Please enter the Numbers">
                </Input>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="Threshold described"
                        label-position="top"
                        prop="judge_des">
                <Input v-model="formData.judge_des"
                             placeholder="Threshold described">
                </Input>
              </FormItem>
              </Col>
            </Row>
            <Row :gutter="32">
              <Col span="6">
              <FormItem label="The alarm data table"
                        label-position="top"
                        prop="judge_table">
                <Input v-model="formData.judge_table"
                       placeholder="The alarm inspection data sheet">
                </Input>
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="The alarm screen configuration tables"
                        label-position="top"
                        prop="conf_table">
                <Input v-model="formData.conf_table"
                       placeholder="The alarm screen configuration tables">
                </Input>
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="The alarm screen configuration field"
                        label-position="top"
                        prop="conf_column">
                <Input v-model="formData.conf_column"
                       placeholder="The alarm screen configuration field">
                </Input>
              </FormItem>
              </Col>
            </Row>
            <Alert show-icon>The alarm judgment SQL configuration</Alert>
            <Row :gutter="32">
              <Col span="24">
              <FormItem prop="judge_sql">
                <Input type="textarea" :rows="10" v-model="formData.judge_sql"
                       >
                </Input>
              </FormItem>
              </Col>
            </Row>
          </Form>
          <div class="demo-drawer-footer" v-show="showfooter" >
            <Button style="margin-right: 8px"
                    @click="create = false">cancel</Button>
            <Button type="primary"
                    @click="handleSubmit('formData')">submit</Button>
          </div>
        </Drawer>

      </Row>
    </Card>
  </Row>
</template>

<script>
import { getAlarmConf, updateAlarmConf } from '@/api/system'
import { hasOneOf } from '@/libs/tools'
export default {
  data () {
    return {
      columns: [
        {
          type: 'index',
          width: 60,
          align: 'center',
          sortable: true
        },
        {
          title: 'Alarm types',
          key: 'type',
          width: 120,
          render: (h, params) => {
            const typeMap = {
              1: { desc: 'Oracle database' },
              2: { desc: 'MYSQL database' },
              3: { desc: 'Redis' },
              4: { desc: 'Linux host ' }
            }
            const type = params.row.type
            return h('div', typeMap[type]['desc'])
          }
        },
        {
          title: 'The alarm name',
          key: 'name',
          width: 220
        },
        {
          title: 'The operator',
          key: 'judge',
          width: 80
        },
        {
          title: 'The threshold value',
          key: 'judge_value',
          width: 100
        },
        {
          title: 'The threshold that',
          key: 'judge_des',
          width: 200
        },
        {
          title: 'operation',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {

                  click: () => {
                    this.show = true
                    this.view(params.index)
                  }
                }
              }, 'details'),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  display: (this.updateAccessAll !== true) ? 'none' : 'inline-block'
                },
                on: {
                  click: () => {
                    this.update(params.index)
                  }
                }
              }, 'The editor'),
              h('Poptip', {
                props: {
                  confirm: true,
                  title: 'Sure you want to delete！',
                  transfer: true
                },
                style: {
                  marginRight: '5px',
                  display: (this.deleteAccessAll !== true) ? 'none' : 'inline-block'
                },
                on: {
                  'on-ok': () => {
                    this.remove(params.index, params.row.id)
                  }
                }
              }
              )
            ])
          }
        }
      ],
      data: [],
      count: 0,
      page_size: 10,
      alarm_name_search: '',
      create: false,
      showfooter: true,
      close: false,
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      updateId: null,
      formData: {
        type: '',
        name: '',
        judge: '',
        judge_value: '',
        judge_des: '',
        password: '',
        judge_table: '',
        judge_sql: '',
        conf_table: '',
        conf_column: ''
      },
      ruleValidate: {
        type: [
          { required: true, message: 'This project required', trigger: 'blur' }
        ],
        name: [
          { required: true, message: 'This project required', trigger: 'blur' }
        ],
        judge_table: [
          { required: true, message: 'This project required', trigger: 'blur' }
        ],
        judge_sql: [
          { required: true, message: 'This project required', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.get_alarm_conf_list()
  },
  computed: {
    access () {
      return this.$store.state.user.access
    },
    addAccessAll () {
      return hasOneOf(['system.add_alarmconf'], this.access)
    },
    updateAccessAll () {
      return hasOneOf(['system.change_alarmconf'], this.access)
    },
    deleteAccessAll () {
      return hasOneOf(['system.delete_alarmconf'], this.access)
    }
  },
  methods: {
    get_alert_conf_parameter (parameter) {
      console.log(parameter)
      this.get_alarm_conf_list(`page=${parameter}`)
    },
    search () {
      console.log(this.alarm_name_search)
      this.get_alarm_conf_list(`name=${this.alarm_name_search}`)
    },
    clear_search () {
      this.alarm_name_search = ''
      this.get_alarm_conf_list()
    },
    get_alarm_conf_list (parameter) {
      getAlarmConf(parameter).then(res => {
        this.data = res.data.results
        this.count = res.data.count
        console.log(this.data)
      }).catch(err => {
        this.$Message.error(`Error accessing the alarm configuration information ${err}`)
      })
    },
    view (index) {
      this.update(index)
      this.showfooter = false
      this.close = true
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        console.log()
        if (valid) {
          if (!this.updateId) {
            createAlarmConf(this.formData).then(res => {
              console.log(res)
              this.$Message.success('New alarm configuration is successful!')
              this.get_alarm_conf_list()
              this.create = false
            }).catch(err => {
              console.log(err.response)
              this.$Message.error({
                content: `New alarm configuration errors ${Object.entries(err.response.data)}`,
                duration: 10,
                closable: true
              })
            })
          } else {
            console.log(this.updateId)
            updateAlarmConf(this.updateId, this.formData).then(res => {
              console.log(res)
              this.$Message.success('Update the alarm configuration is successful!')
              this.get_alarm_conf_list()
              this.create = false
            }).catch(err => {
              console.log(err.response)
              this.$Message.error({
                content: `Update the alarm configuration errors ${Object.entries(err.response.data)}`,
                duration: 10,
                closable: true
              })
            })
          }
        } else {
          this.$Message.error('error!')
        }
      })
    },
    add () {
      this.create = true
      this.showfooter = true
      this.close = false
      this.updateId = null
      this.formData.type = '1'
      this.formData.name = ''
      this.formData.judge = ''
      this.formData.judge_value = ''
      this.formData.judge_des = ''
      this.formData.judge_table = ''
      this.formData.judge_sql = ''
      this.formData.conf_table = ''
      this.formData.conf_column = ''
    },
    remove (index, id) {
      console.log(index, id)
      deleteLinux(id).then(res => {
        console.log(res)
        this.$Message.success('Linux configuration was removed successfully!')
        this.data.splice(index, 1)
      }).catch(err => {
        console.log(err.response)
        this.$Message.error({
          content: `Delete the Linux configuration errors ${Object.entries(err.response.data)}`,
          duration: 10,
          closable: true
        })
      })
    },
    update (index) {
      this.create = true
      this.showfooter = true
      this.close = false
      this.formData.type = String(this.data[index].type)
      this.formData.name = this.data[index].name
      this.formData.judge = this.data[index].judge
      this.formData.judge_value = this.data[index].judge_value
      this.formData.judge_des = this.data[index].judge_des
      this.formData.judge_table = this.data[index].judge_table
      this.formData.judge_sql = this.data[index].judge_sql
      this.formData.conf_table = this.data[index].conf_table
      this.formData.conf_column = this.data[index].conf_column
      this.updateId = this.data[index].id
    }
  }
}
</script>
<style>
.demo-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
</style>
