<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">
        <i class="ion ion-clipboard mr-1"></i>
        待办事项
      </h3>

      <div class="card-tools">
        <ul class="pagination pagination-sm">
          <li class="page-item"><a href="#" class="page-link">&laquo;</a></li>
          <li class="page-item"><a href="#" class="page-link">1</a></li>
          <li class="page-item"><a href="#" class="page-link">2</a></li>
          <li class="page-item"><a href="#" class="page-link">3</a></li>
          <li class="page-item"><a href="#" class="page-link">&raquo;</a></li>
        </ul>
      </div>
    </div>
    <!-- /.card-header -->
    <div class="card-body">
      <ul class="todo-list" data-widget="todo-list">
        <li>
          <!-- drag handle -->
          <span class="handle">
            <i class="fas fa-ellipsis-v"></i>
            <i class="fas fa-ellipsis-v"></i>
          </span>
          <!-- checkbox -->
          <div  class="icheck-primary d-inline ml-2">
            <input type="checkbox" value="" name="todo1" id="todoCheck1">
            <label for="todoCheck1"></label>
          </div>
          <!-- todo text -->
          <span class="text">市一中 - 302室设备故障</span>
          <!-- Emphasis label -->
          <small class="badge badge-danger"><i class="far fa-clock"></i> 2 分钟前</small>
          <!-- General tools such as edit or delete-->
          <div class="tools">
            <i class="fas fa-edit"></i>
            <i class="fas fa-trash-o"></i>
          </div>
        </li>
        <li>
          <span class="handle">
            <i class="fas fa-ellipsis-v"></i>
            <i class="fas fa-ellipsis-v"></i>
          </span>
          <div  class="icheck-primary d-inline ml-2">
            <input type="checkbox" value="" name="todo2" id="todoCheck2" checked>
            <label for="todoCheck2"></label>
          </div>
          <span class="text">市一中 - 301室完成消杀 </span>
          <small class="badge badge-info"><i class="far fa-clock"></i> 4 小时前</small>
          <div class="tools">
            <i class="fas fa-edit"></i>
            <i class="fas fa-trash-o"></i>
          </div>
        </li>
        <li>
          <span class="handle">
            <i class="fas fa-ellipsis-v"></i>
            <i class="fas fa-ellipsis-v"></i>
          </span>
          <div  class="icheck-primary d-inline ml-2">
            <input type="checkbox" value="" name="todo3" id="todoCheck3">
            <label for="todoCheck3"></label>
          </div>
          <span class="text">市一中 - 201室添加设备成功 </span>
          <small class="badge badge-warning"><i class="far fa-clock"></i> 2 天前</small>
          <div class="tools">
            <i class="fas fa-edit"></i>
            <i class="fas fa-trash-o"></i>
          </div>
        </li>
        <li>
          <span class="handle">
            <i class="fas fa-ellipsis-v"></i>
            <i class="fas fa-ellipsis-v"></i>
          </span>
          <div  class="icheck-primary d-inline ml-2">
            <input type="checkbox" value="" name="todo4" id="todoCheck4">
            <label for="todoCheck4"></label>
          </div>
          <span class="text">市一中 - 202室添加设备成功</span>
          <small class="badge badge-success"><i class="far fa-clock"></i> 3 天前</small>
          <div class="tools">
            <i class="fas fa-edit"></i>
            <i class="fas fa-trash-o"></i>
          </div>
        </li>
        <li>
          <span class="handle">
            <i class="fas fa-ellipsis-v"></i>
            <i class="fas fa-ellipsis-v"></i>
          </span>
          <div  class="icheck-primary d-inline ml-2">
            <input type="checkbox" value="" name="todo5" id="todoCheck5">
            <label for="todoCheck5"></label>
          </div>
          <span class="text">市一中 - 203室添加设备成功 </span>
          <small class="badge badge-primary"><i class="far fa-clock"></i> 1 上周</small>
          <div class="tools">
            <i class="fas fa-edit"></i>
            <i class="fas fa-trash-o"></i>
          </div>
        </li>
        <li>
          <span class="handle">
            <i class="fas fa-ellipsis-v"></i>
            <i class="fas fa-ellipsis-v"></i>
          </span>
          <div  class="icheck-primary d-inline ml-2">
            <input type="checkbox" value="" name="todo6" id="todoCheck6">
            <label for="todoCheck6"></label>
          </div>
          <span class="text">市一中 - 203室设备已离线 </span>
          <small class="badge badge-secondary"><i class="far fa-clock"></i> 1 天前</small>
          <div class="tools">
            <i class="fas fa-edit"></i>
            <i class="fas fa-trash-o"></i>
          </div>
        </li>
      </ul>
    </div>
    <!-- /.card-body -->
  </div>
</template>

<script>
export default {
  name: 'wg-todo-list'
}
</script>
