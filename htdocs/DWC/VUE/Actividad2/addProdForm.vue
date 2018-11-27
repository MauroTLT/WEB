'use strict'

Vue.component('add-prod-form', {
  template:
'  <form id="new-prod" method="POST">'+
'    <fieldset>'+
'        <legend>Nuevo producto</legend>'+
'        <div class="form-group">'+
'            <label for="new-cod">Código:</label>'+
'            <input type="text" class="form-control" id="new-cod" required>'+
'        </div>'+
'        <div class="form-group">'+
'            <label for="new-name">Nombre:</label>'+
'            <input type="text" class="form-control" id="new-name" required>'+
'        </div>'+
'        <div class="form-group">'+
'            <label for="new-units">Unidades:</label>'+
'            <input type="number" class="form-control" id="new-units" required min="0" step="1">'+
'        </div>'+
'        <div class="form-group">'+
'            <label for="new-price">Precio/u.:</label>'+
'            <input type="number" class="form-control" id="new-price" required min="0" step="0.01">'+
'        </div>'+
'        <button type="submit" class="btn btn-default">Añadir</button>'+
'        <button type="reset" class="btn btn-default">Reset</button>'+
'    </fieldset>'+
'</form>'
});
