<template>
  <Row>
    <Card>
      <Row>
        <Button @click="add"
                v-if="addAccessAll"
                type="primary">Add</Button>&nbsp;
        <Input v-model="host_search"
               placeholder="IP address"
               style="width: 100px" />&nbsp;
        <Button @click="search"
                type="primary">search</Button>&nbsp;
        <Button @click="clear_search"
                type="success">Refresh</Button>
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
              @on-change="get_linux_parameter"
              show-elevator
              show-total />
      </Row>
      <Row>
        <Drawer title="Linux host configuration"
                v-model="create"
                width="720"
                :mask-closable="this.close"
                :styles="styles">
          <Form ref="formData"
                :model="formData"
                :rules="ruleValidate">
            <Alert show-icon>Linux host configuration</Alert>
            <Row :gutter="32">
              <Col span="6">
              <FormItem label="Label"
                        label-position="top"
                        prop="tags">
                <Input v-model="formData.tags"
                       placeholder="Custom only一Label" />
              </FormItem>
              </Col>
              <Col span="6">
              <FormItem label="IP address"
                        label-position="top"
                        prop="host">
                <Input v-model="formData.host"
                       placeholder="Please fill in the IP address" />
              </FormItem>
              </Col>
              <Col span="4">
              <FormItem label="Host name"
                        label-position="top"
                        prop="port">
                <Input v-model="formData.hostname"
                       placeholder="Host name">
                </Input>
              </FormItem>
              </Col>
            </Row>
            <Row :gutter="32">
              <Col span="8">
              <FormItem label="Linux version"
                        label-position="top"
                        prop="db_version">
                <Select v-model="formData.linux_version"
                        placeholder="">
                  <Option value="Linux6">Linux6</Option>
                  <Option value="Linux7">Linux7</Option>
                </Select>
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="Kernel version"
                        label-position="top"
                        prop="db_version">
                <Input v-model="formData.linux_kernel"
                       placeholder="Kernel">
                </Input>
              </FormItem>
              </Col>
            </Row>
            <Alert show-icon>Operating system configuration</Alert>
            <Row :gutter="32">
              <Col span="6">
              <FormItem label="Operating system user name"
                        label-position="top"
                        prop="user">
                <Input v-model="formData.user"
                             placeholder="Operating system user name">
                </Input>
              </FormItem>
              </Col>
              <Col span="6">
              <FormItem label="Operating system user password"
                        label-position="top"
                        prop="password">
                <Input type="password" v-model="formData.password"
                             placeholder="Operating system user password">
                </Input>
              </FormItem>
              </Col>
              <Col span="6">
              <FormItem label="Operating system the SSH port number"
                        label-position="top"
                        prop="sshport">
                <InputNumber v-model="formData.sshport"
                             placeholder="Operating system the SSH port number">
                </InputNumber>
              </FormItem>
              </Col>
            </Row>
            <Alert show-icon>Room information</Alert>
            <Row :gutter="32">
              <Col span="6">
              <FormItem label="Serial number"
                        label-position="top"
                        prop="serialno">
                <Input v-model="formData.serialno"
                       placeholder="Serial number">
                </Input>
              </FormItem>
              </Col>
              <Col span="4">
              <FormItem label="state"
                        label-position="top"
                        prop="status">
                <Select v-model="formData.status"
                        placeholder="">
                  <Option value="0">online</Option>
                  <Option value="1">The standby</Option>
                  <Option value="2">offline</Option>
                  <Option value="3">Stay with</Option>
                  <Option value="4">maintenance</Option>
                  <Option value="5">reinstall</Option>
                </Select>
              </FormItem>
              </Col>
              <Col span="6">
              <FormItem label="cabinet"
                        label-position="top"
                        prop="cabinet">
                <Input v-model="formData.cabinet"
                       placeholder="cabinet">
                </Input>
              </FormItem>
              </Col>
              <Col span="6">
              <FormItem label="Server manufacturer"
                        label-position="top"
                        prop="factory">
                <Input v-model="formData.factory"
                       placeholder="Server manufacturer">
                </Input>
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="Date of purchase"
                        label-position="top"
                        prop="purchase_date">
                <DatePicker v-model="formData.purchase_date" value="yyyymmdd" type="date" placeholder="Select a date" style="width: 200px"></DatePicker>
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="Warranty start date"
                        label-position="top"
                        prop="beginprotection_date">
                <DatePicker v-model="formData.beginprotection_date"  type="date" placeholder="Select a date" style="width: 200px"></DatePicker>
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="Confirmed date"
                        label-position="top"
                        prop="overprotection_date">
                <DatePicker v-model="formData.overprotection_date" type="date" placeholder="Select a date" style="width: 200px"></DatePicker>
              </FormItem>
              </Col>
            </Row>
            <Alert show-icon>Server description</Alert>
            <Row :gutter="32">
              <Col span="4">
              <FormItem label="Business system"
                        label-position="top"
                        prop="bussiness_system">
                <Input v-model="formData.bussiness_system"
                       placeholder="Ownership system">
                </Input>
              </FormItem>
              </Col>
              <Col span="4">
              <FormItem label="System level"
                        label-position="top"
                        prop="db_version">
                <Select v-model="formData.system_level"
                        placeholder="">
                  <Option value="0">The core system</Option>
                  <Option value="1">Important systems</Option>
                  <Option value="2">一System</Option>
                </Select>
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="Server description"
                        label-position="top"
                        prop="res_description">
                <Input v-model="formData.res_description"
                       placeholder="Server description">
                </Input>
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="Main software deployment"
                        label-position="top"
                        prop="main_software">
                <Input v-model="formData.main_software"
                       placeholder="Main software deployment">
                </Input>
              </FormItem>
              </Col>
            </Row>
            <Alert show-icon>The alarm configuration</Alert>
            <Row :gutter="32">
              <div>
            <Form class="step-form" :label-width="100">
              <FormItem label="Select the alarm configuration">
                <CheckboxGroup>
                  <Checkbox v-model="formData.alarm_connect" true-value="1" false-value="0" label="Linux host on and off the alarm"></Checkbox>
                  <Checkbox v-model="formData.alarm_cpu" true-value="1" false-value="0" label="Warning CPU utilization"></Checkbox>
                  <Checkbox v-model="formData.alarm_mem" true-value="1" false-value="0" label="Memory usage warning"></Checkbox>
                  <Checkbox v-model="formData.alarm_swap" true-value="1" false-value="0"  label="Swap usage warning"></Checkbox>
                  <Checkbox v-model="formData.alarm_disk" true-value="1" false-value="0"  label="Disk usage warning"></Checkbox>
                  <Checkbox v-model="formData.alarm_alert_log" true-value="1" false-value="0"  label="Background log alarms"></Checkbox>
                </CheckboxGroup>
              </FormItem>
            </Form>
          </div>
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

      <Modal width="80"
        v-model="webssh"
        title="Common Modal dialog box title"
        @on-ok="ok_webssh"
        @on-cancel="cancel_webssh">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
              <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
              <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </Modal>
    </Card>
  </Row>
</template>

<script>
import { getLinuxList, createLinux, updateLinux, deleteLinux } from '@/api/assets'
import { hasOneOf } from '@/libs/tools'
import { Tag } from 'iview'
export default {
  data () {
    return {
      webssh: false,
      columns: [
        {
          title: 'Label',
          key: 'tags',
          width: 120
        },
        {
          title: 'IP address',
          key: 'host',
          width: 150
        },
        {
          title: 'Host name',
          key: 'hostname',
          width: 160
        },
        {
          title: 'Linux version',
          key: 'linux_version',
          width: 100
        },
        {
          title: 'Connect user name',
          key: 'user',
          width: 110
        },
        {
          title: 'state',
          key: 'status',
          width: 90,
          render: (h, params) => {
            const statusMap = {
              0: { color: 'green', desc: 'online' },
              1: { color: 'gray', desc: 'The standby' },
              2: { color: 'gray', desc: 'offline' },
              3: { color: 'gray', desc: 'Stay with' },
              4: { color: 'gray', desc: 'maintenance' },
              5: { color: 'gray', desc: 'reinstall' }
            }
            const status = params.row.status
            return h(Tag, { props: { color: statusMap[status]['color'] } }, statusMap[status]['desc'])
          }
        },
        {
          title: 'Business systems',
          key: 'bussiness_system',
          width: 90
        },
        {
          title: 'System level',
          key: 'system_level',
          width: 120,
          render: (h, params) => {
            const levelMap = {
              0: { color: 'red', desc: 'Core system' },
              1: { color: 'orange', desc: 'Important systems' },
              2: { color: 'gray', desc: '一System' }
            }
            const system_level = params.row.system_level
            return h(Tag, { props: { color: levelMap[system_level]['color'] } }, levelMap[system_level]['desc'])
          }
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
              }, 'Editor'),
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
              }, [h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  display: (this.deleteAccessAll !== true) ? 'none' : 'inline-block'
                }
              }, 'delete')])
            ])
          }
        }
      ],
      data: [],
      count: 0,
      page_size: 10,
      host_search: '',
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
        tags: '',
        host: '',
        hostname: '',
        linux_version: 'Linux6',
        user: '',
        password: '',
        sshport: 22,
        serialno: '',
        status: '0',
        cabinet: '',
        factory: '',
        purchase_date: '',
        beginprotection_date: '',
        overprotection_date: '',
        bussiness_system: '',
        system_level: '0',
        res_description: '',
        main_software: '',
        alarm_connect: '',
        alarm_cpu: '',
        alarm_mem: '',
        alarm_swap: '',
        alarm_disk: '',
        alarm_alert_log: ''
      },
      ruleValidate: {
        tags: [
          { required: true, message: 'This project required', trigger: 'blur' }
        ],
        host: [
          { required: true, message: 'This project required', trigger: 'blur' }
        ],
        hostname: [
          { required: true, message: 'This project required', trigger: 'blur' }
        ],
        user: [
          { required: true, message: 'This project required', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'This project required', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.get_linux_list()
  },
  computed: {
    access () {
      return this.$store.state.user.access
    },
    addAccessAll () {
      return hasOneOf(['assets.add_linuxlist'], this.access)
    },
    updateAccessAll () {
      return hasOneOf(['assets.change_linuxlist'], this.access)
    },
    deleteAccessAll () {
      return hasOneOf(['assets.delete_linuxlist'], this.access)
    }
  },
  methods: {
    ok_webssh () {
      this.$Message.info('Confirm operation ')
    },
    cancel_webssh () {
      this.$Message.info('Cancel operation')
    },
    search () {
      console.log(this.host_search)
      this.get_linux_list(`host=${this.host_search}`)
    },
    clear_search () {
      this.host_search = ''
      this.get_linux_list()
    },
    get_linux_list (parameter) {
      getLinuxList(parameter).then(res => {
        this.data = res.data.results
        this.count = res.data.count
        console.log(this.data)
      }).catch(err => {
        this.$Message.error(`Error accessing Linux resource information ${err}`)
      })
    },
    get_linux_parameter (parameter) {
      console.log(parameter)
      this.get_linux_list(`page=${parameter}`)
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
            createLinux(this.formData).then(res => {
              console.log(res)
              this.$Message.success('The new Linux configuration success!')
              this.get_linux_list()
              this.create = false
            }).catch(err => {
              console.log(err.response)
              this.$Message.error({
                content: `New Linux configuration errors ${Object.entries(err.response.data)}`,
                duration: 10,
                closable: true
              })
            })
          } else {
            console.log(this.updateId)
            updateLinux(this.updateId, this.formData).then(res => {
              console.log(res)
              this.$Message.success('Update the Linux configuration success!')
              this.get_linux_list()
              this.create = false
            }).catch(err => {
              console.log(err.response)
              this.$Message.error({
                content: `Update the Linux configuration errors ${Object.entries(err.response.data)}`,
                duration: 10,
                closable: true
              })
            })
          }
        } else {
          this.$Message.error('Error!')
        }
      })
    },
    add () {
      this.create = true
      this.showfooter = true
      this.close = false
      this.updateId = null
      this.formData.tags = ''
      this.formData.host = ''
      this.formData.hostname = ''
      this.formData.db_version = 'Linux6'
      this.formData.linux_kernel = ''
      this.formData.user = ''
      this.formData.password = ''
      this.formData.sshport = 22
      this.formData.serialno = ''
      this.formData.status = '0'
      this.formData.cabinet = ''
      this.formData.factory = ''
      this.formData.purchase_date = ''
      this.formData.beginprotection_date = ''
      this.formData.overprotection_date = ''
      this.formData.bussiness_system = ''
      this.formData.system_level = '0'
      this.formData.res_description = ''
      this.formData.main_software = ''
      this.formData.alarm_connect = '1'
      this.formData.alarm_cpu = '1'
      this.formData.alarm_mem = '1'
      this.formData.alarm_swap = '1'
      this.formData.alarm_disk = '1'
      this.formData.alarm_alert_log = '1'
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
      this.formData.tags = this.data[index].tags
      this.formData.host = this.data[index].host
      this.formData.hostname = this.data[index].hostname
      this.formData.linux_version = this.data[index].linux_version
      this.formData.linux_kernel = this.data[index].linux_kernel
      this.formData.user = this.data[index].user
      this.formData.password = this.data[index].password
      this.formData.sshport = this.data[index].sshport
      this.formData.serialno = this.data[index].serialno
      this.formData.status = String(this.data[index].status)
      this.formData.cabinet = this.data[index].cabinet
      this.formData.factory = this.data[index].factory
      this.formData.purchase_date = this.data[index].purchase_date
      this.formData.beginprotection_date = this.data[index].beginprotection_date
      this.formData.overprotection_date = this.data[index].overprotection_date
      this.formData.bussiness_system = this.data[index].bussiness_system
      this.formData.system_level = String(this.data[index].system_level)
      this.formData.res_description = this.data[index].res_description
      this.formData.main_software = this.data[index].main_software
      this.formData.alarm_connect = String(this.data[index].alarm_connect)
      this.formData.alarm_cpu = String(this.data[index].alarm_cpu)
      this.formData.alarm_mem = String(this.data[index].alarm_mem)
      this.formData.alarm_swap = String(this.data[index].alarm_swap)
      this.formData.alarm_disk = String(this.data[index].alarm_disk)
      this.formData.alarm_alert_log = String(this.data[index].alarm_alert_log)
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
