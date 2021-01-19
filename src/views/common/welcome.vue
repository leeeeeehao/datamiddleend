<template>
  <div>

    <div style="margin-top: 50px">
      <template>
        <div style="background: #ffffff; padding: 30px">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-card>
                <a-statistic
                  title="用户量"
                  :value="11.28"
                  :precision="2"
                  suffix="%"
                  :value-style="{ color: '#3f8600' }"
                  style="margin-right: 50px"
                >
                  <template #prefix>
                    <a-icon type="arrow-up" />
                  </template>
                </a-statistic>
              </a-card>
            </a-col>
            <a-col :span="12">
              <a-card>
                <a-statistic
                  title="使用转换数量"
                  :value="9.3"
                  :precision="2"
                  suffix="%"
                  class="demo-class"
                  :value-style="{ color: '#cf1322' }"
                >
                  <template #prefix>
                    <a-icon type="arrow-down" />
                  </template>
                </a-statistic>
              </a-card>
            </a-col>
          </a-row>
        </div>
      </template>

    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {
      deadline: Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30,
    };
  },
  methods: {
    onFinish() {
      console.log('finished!');
    },
  },
};
</script>
