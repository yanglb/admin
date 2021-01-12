<template>
  <div class="container-fluid">
    <!-- Small boxes (Stat box) -->
    <wg-dev-count />

    <!-- /.row -->
    <!-- Main row -->
    <div class="row">
      <!-- Left col -->
      <section class="col-lg-7 connectedSortable">
        <wg-today />
        <wg-daily />
      </section>
      <!-- /.Left col -->
      <!-- right col (We are only adding the ID to make the widgets sortable)-->
      <section class="col-lg-5 connectedSortable">
        <!-- Map card -->
        <wg-vector-map />

        <!-- TO DO List -->
        <wg-todo-list />
        <!-- /.card -->
      </section>
      <!-- right col -->
    </div>
    <!-- /.row (main row) -->
  </div><!-- /.container-fluid -->
</template>
