<script>
import { getSystemInfo } from '@/utils/uniUtils'
import { useAppStore } from '@/store'

export default {
  onLaunch() {
    this.setSystemInfo()
  },
  onLoad(options) {
    console.log(options, 'app-onLoad')
  },
  methods: {
    setSystemInfo() {
      const store = useAppStore()
      const systemInfo = getSystemInfo()
      store.setSystemInfo(systemInfo)
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/index.scss';
</style>
