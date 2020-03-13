<template>
    <div>
        <h1>文章列表</h1>
        <el-table :data="items">
            <el-table-column prop="_id" label="ID" width="240"></el-table-column>
            <el-table-column prop="title" label="文章标题"></el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="$router.push(`/articles/edit/${scope.row._id}`)">编辑</el-button>
                    <el-button type="primary" size="small" @click="remove(scope.row)">删除</el-button>
                </template>
                </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
   
    data() {
        return {
            items: []
        }
    },
    methods: {
        async fetch() {
            const res = await this.$http.get('rest/articles')
            console.log("文章res==",res)
            this.items = res.data
        },
        remove(row) {
            this.$confirm(`确认删除分类${row.title}?`)
            .then(async () => {
                const res =  await this.$http.delete(`rest/articles/${row._id}`)
                console.log("delete row res==",res)
                this.$message({
                    type:'success',
                    message: '删除成功'
                })
                this.fetch()
            })
            .catch(()=> {})
            }
        
    },
    created() {
        this.fetch()
    },
}
</script>