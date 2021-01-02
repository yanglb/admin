<template>
  <div class="row">
    <div class="col-md-4">
      <!-- <div class="card">
        <div class="card-header">
          <h3 class="card-title">
            <i class="fas fa-bolt"></i>
            循环杀
          </h3>
        </div>
        <div class="card-body">
          <a class="btn btn-app" @click="exec(CommandCodes.FanOn)">
            <i class="fas fa-play"></i> 开
          </a>
          <a class="btn btn-app" @click="exec(CommandCodes.FanOff)">
            <i class="fas fa-stop"></i> 关
          </a>
        </div>
      </div>
    
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">
            <i class="fas fa-bolt"></i>
            照射杀
          </h3>
        </div>
        <div class="card-body">
          <a class="btn btn-app" @click="exec(CommandCodes.UVOn)">
            <i class="fas fa-play"></i> 开
          </a>
          <a class="btn btn-app" @click="exec(CommandCodes.UVOff)">
            <i class="fas fa-stop"></i> 关
          </a>
        </div>
      </div> -->
    
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">
            <i class="fas fa-bolt"></i>
            执行命令
          </h3>
        </div>
        <div class="card-body">
          <a class="btn btn-app" @click="exec(CommandCodes.Detect)">
            <i class="fas fa-play"></i> 检测
          </a>
          <!-- <a class="btn btn-app" @click="exec(0xff)">
            <i class="fas fa-stop"></i> 不存在的命令
          </a> -->
        </div>
      </div>
    </div>

    <!-- 设置 -->
    <div class="col-md-8">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">
            <i class="fas fa-bolt"></i>
            设置
          </h3>
        </div>
        <div class="card-body">
          <el-form 
            :model="settingData" 
            :rules="rules" 
            ref="settingForm" 
            label-width="100px">
            <el-form-item label="循环杀模式">
              <el-radio-group v-model="settingData.fanMode" disabled>
                <el-radio :label="DeviceWorkingModeEnum.Automatic">自动</el-radio>
                <el-radio :label="DeviceWorkingModeEnum.Manual">手动</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="循环杀时间" required style="max-width: 480px;">
              <el-col :span="11">
                <el-form-item prop="fanStartTime">
                  <el-time-picker
                    style="width: 100%;"
                    v-model="settingData.fanStartTime"
                    editable
                    value-format="HH:mm"
                    :disabled="settingData.fanMode != DeviceWorkingModeEnum.Automatic"
                    placeholder="选择开始时间">
                  </el-time-picker>
                </el-form-item>
              </el-col>
              <el-col :span="2" style="text-align: center;">
                <span class="line">~</span>
              </el-col>
              <el-col :span="11">
                <el-form-item prop="fanEndTime">
                  <el-time-picker
                    style="width: 100%;"
                    v-model="settingData.fanEndTime"
                    editable
                    value-format="HH:mm"
                    :disabled="settingData.fanMode != DeviceWorkingModeEnum.Automatic"
                    placeholder="选择结束时间">
                  </el-time-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="风扇转速">
              <el-radio-group v-model="settingData.fanSpeed">
                <el-radio :label="DeviceFanSpeedEnum.High">高</el-radio>
                <el-radio :label="DeviceFanSpeedEnum.Medium">中</el-radio>
                <el-radio :label="DeviceFanSpeedEnum.Low">低</el-radio>
              </el-radio-group>
            </el-form-item>

            <!-- 照射杀 -->
            <el-divider></el-divider>
            <el-form-item label="照射杀模式">
              <el-radio-group v-model="settingData.UVMode" disabled>
                <el-radio :label="DeviceWorkingModeEnum.Automatic">自动</el-radio>
                <el-radio :label="DeviceWorkingModeEnum.Manual">手动</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="安全时间" required style="max-width: 480px;">
              <el-col :span="11">
                <el-form-item prop="UVStartTime">
                  <el-time-picker
                    style="width: 100%;"
                    v-model="settingData.UVStartTime"
                    editable
                    value-format="HH:mm"
                    :disabled="settingData.UVMode != DeviceWorkingModeEnum.Automatic"
                    placeholder="选择开始时间">
                  </el-time-picker>
                </el-form-item>
              </el-col>
              <el-col :span="2" style="text-align: center;">
                <span class="line">~</span>
              </el-col>
              <el-col :span="11">
                <el-form-item prop="UVEndTime">
                  <el-time-picker
                    style="width: 100%;"
                    v-model="settingData.UVEndTime"
                    editable
                    value-format="HH:mm"
                    :disabled="settingData.UVMode != DeviceWorkingModeEnum.Automatic"

                    placeholder="选择结束时间">
                  </el-time-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="消杀时长" required prop='UVMinute'>
              <el-input-number v-model="settingData.UVMinute" :min="1" :max="255"></el-input-number>
              <span>&nbsp;分钟</span>
            </el-form-item>

            <!-- 其它 -->
            <el-divider></el-divider>
            <el-form-item label="上报间隔" prop='reportInterval'>
              <el-input-number v-model="settingData.reportInterval" :min="1" :max="60"></el-input-number>
              <span>&nbsp;分钟</span>
            </el-form-item>
            <el-form-item label="雷达使能">
              <el-switch v-model="settingData.radarControl"></el-switch>
            </el-form-item>

            <!-- 按钮 -->
            <el-divider></el-divider>
            <el-form-item>
              <!-- <a class="btn btn-app" @click="exec(CommandCodes.ReadSetting)">
                <i class="fas fa-download"></i> 读取
              </a> -->
              <a class="btn btn-app" @click="saveSetting()">
                <i class="fas fa-save"></i> 应用
              </a>
              <!-- <a class="btn btn-app" @click="resetForm()">
                <i class="fas fa-reply"></i> 重置
              </a> -->
            </el-form-item>

            <div class="el-loading-mask read-setting" 
              v-if="loading"
              @click="exec(CommandCodes.ReadSetting)"
            >
              <div class="el-loading-spinner">
                <i class="el-icon-refresh"></i>
                <p class="el-loading-text">点击获取设备最新配置信息</p>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { execCmd, execSetSettingCmd, execReadSettingCmd } from '@/api/devices'
import { CommandExecutionResultCode, CommandCodes, DeviceWorkingModeEnum, DeviceFanSpeedEnum } from '@/const/cmd'

export default {
  name: 'wg-command',
  props: {
    number: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      loading: true,
      CommandCodes,
      DeviceWorkingModeEnum,
      DeviceFanSpeedEnum,
      settingData: {
        fanMode: DeviceWorkingModeEnum.Automatic,
        fanSpeed: DeviceFanSpeedEnum.Medium,
        fanStartTime: '8:00',
        fanEndTime: '18:00',
        UVMode: DeviceWorkingModeEnum.Automatic,
        UVMinute: 60,
        UVStartTime: '10:00',
        UVEndTime: '4:00',
        reportInterval: 10,
        radarControl: true
      },
      rules: {
        fanStartTime: [
          { required: true, message: '请选择时间', trigger: 'blur' }
        ],
        fanEndTime: [
          { required: true, message: '请选择时间', trigger: 'blur' }
        ],
        UVStartTime: [
          { required: true, message: '请选择时间', trigger: 'blur' }
        ],
        UVEndTime: [
          { required: true, message: '请选择时间', trigger: 'blur' }
        ],
        UVMinute: [
          { required: true, message: '请设置消杀时间', trigger: 'blur' }
        ],
        reportInterval: [
          { required: true, message: '请设置上报时间总间隔', trigger: 'blur' }
        ]
      },
    }
  },

  methods: {
    saveSetting () {
      this.$refs.settingForm.validate((valid) => {
          if (valid) {
            this.exec(CommandCodes.SetSetting, this.settingData)
          } else {
            this.$message.error('请正确填写设置内容');
            return false;
          }
        })
    },

    resetForm() {
      this.$refs.settingForm.resetFields();
    },

    async exec(code, data) {
      let res;
      if (code === CommandCodes.SetSetting) {
        res = await execSetSettingCmd(this.$route.params.number, data)
      } else if (code === CommandCodes.ReadSetting){
        res = await execReadSettingCmd(this.$route.params.number, data)
      } else {
        res = await execCmd(this.$route.params.number, code, data)
      }
      if (res.success) {
        if (code == CommandCodes.ReadSetting) {
          this.settingData = res.data
          // 自动
          this.settingData.fanMode = DeviceWorkingModeEnum.Automatic
          this.settingData.UVMode = DeviceWorkingModeEnum.Automatic

          this.loading = false
          setTimeout(() => {
            this.$refs.settingForm.validate(valid => console.log(valid))
          }, 100)
          this.$message.info('设置信息获取成功。')
          return
        }
        if (res.data === CommandExecutionResultCode.Success) {
          this.$notify({
            title: '成功',
            message: '命令执行成功',
            type: 'success'
          });
        } else {
          this.$notify({
            title: '成功',
            message: '命令执行成功，但设备返回失败: ' + res.data,
            type: 'success'
          });
        }
      } else {
        this.$notify.error({
          title: '错误',
          message: `命令执行失败: ${res.message}`
        });
      }
    }
  }
}
</script>

<style scoped>
.read-setting {
  cursor: pointer;
}
</style>
