<template>
  <div>
    展示
    <div id="myChart" :style="{width:'500px',height:'300px'}"></div>
  </div>
</template>

<script>
export default {
    mounted() {
        this.drawLine();
    },
  methods: {
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption({
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
    }]
});
    }
  }
};
</script>