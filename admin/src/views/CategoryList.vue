<template>
    <div>
        <h1>分类列表</h1>
        <el-table :data="items">
            <el-table-column prop="_id" label="ID" width="240"></el-table-column>
            <el-table-column prop="parent.name" label="上级分类"></el-table-column>
            <el-table-column prop="name" label="分类名称"></el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
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
            const res = await this.$http.get('rest/categories')
            console.log("分类列表==",res)
            this.items = res.data
        },
        remove(row) {
            this.$confirm(`确认删除分类${row.name}?`)
            .then(async () => {
                const res =  await this.$http.delete(`rest/categories/${row._id}`)
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