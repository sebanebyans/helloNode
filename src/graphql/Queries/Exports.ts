export const EXPORT_SIMPLIROUTE = gql`
  query GetSimpliRouteReport($dateIni: String, $dateEnd: String) {
    getSimpliRouteReport(dateIni: $dateIni, dateEnd: $dateEnd) {
      id
      name
      rut
      direction
      charge
      startTime
      endTime
      timeService
      notes
      lat
      long
      requiredSkills
      operationalSkills
      phone
      contactPerson
      startTime2
      endTime2
      charge2
      charge3
      priority
      email
      sms
    }
  }
`;
import { gql } from '@apollo/client';

export const EXPORT_NOVUSLIS = gql`
  query GetNovuslisReport($dateIni: String, $dateEnd: String, $isCovid: Boolean) {
    getNovuslisReport(dateIni: $dateIni, dateEnd: $dateEnd, isCovid: $isCovid) {
      code
      rut
      dv
      passport
      name
      lastName
      birthdate
      secondLastName
      direction
      gender
      state
      phone
      email
      office
      procedence
      agreement
      benefit
    }
  }
`;

export const EXPORT_SOFTLAND = gql`
  query GetSoftlandReport(
    $dateIni: String
    $dateEnd: String
    $affectionNumber: Int
    $exemptNumber: Int
    $saveReport: Boolean
  ) {
    getSoftlandReport(
      dateIni: $dateIni
      dateEnd: $dateEnd
      affectionNumber: $affectionNumber
      exemptNumber: $exemptNumber
      saveReport: $saveReport
    ) {
      Tipo_de_Documento_de_Venta
      Subtipo_del_Documento
      Estado_del_Documento
      Bodega_Origen_de_los_Productos
      Numero_de_Documento
      Concepto_del_Documento
      Fecha_de_Generacion_del_Documento
      Fecha_de_Vencimiento_del_Documento
      Moneda_del_Documento
      Observacion
      Equivalencia_de_la_Moneda_de_Venta_del_Documento
      NCredito_por_Devolucion_o_Refacturacion
      Guia_de_Entrada_que_Referencia
      Motivo_Anulacion
      Nro_Documento_que_Referencia
      Tipo_de_documento_que_referencia
      Codigo_de_Cliente
      Nombre_del_Cliente
      Rut_del_Cliente
      Giro_del_Cliente
      Mail_DTE_del_Cliente
      Direccion_del_Cliente
      N_Direccion_del_Cliente
      Comuna_del_Cliente
      Ciudad_del_Cliente
      Lugar_del_Documento
      Direccion_del_Documento
      Codigo_Comuna_del_Documento
      Codigo_Ciudad_del_Documento
      Codigo_Region_del_Documento
      Codigo_Pais_del_Documento
      Codigo_Lista_de_Precios
      Codigo_de_Vendedor
      Codigo_Centro_de_Costo
      Codigo_Condicion_de_Pago
      Codigo_de_Distribuidor
      Nombre_de_Distribuidor
      Codigo_Lugar_de_Despacho
      Retirado_Por
      Patente_del_Camion_de_Despacho
      Solicitado_Por
      Rut_Solicitante
      Despachado_Por
      Rut_Transportista
      Cuenta_Contable_para_Notas_de_Debito
      Porcentaje_de_Descuento_1
      Valor_de_Descuento_1
      Porcentaje_de_Descuento_2
      Valor_de_Descuento_2
      Porcentaje_de_Descuento_3
      Valor_de_Descuento_3
      Porcentaje_de_Descuento_4
      Valor_de_Descuento_4
      Porcentaje_de_Descuento_5
      Valor_de_Descuento_5
      Flete
      Embalaje
      Codigo_de_Canal_de_Ventas
      Total_Final
      Codigo_de_Producto
      Codigo_Unidad_de_Medida
      Detalle_del_Producto
      Descripcion_del_Producto
      Cantidad_Facturada
      Cantidad_Despachada
      Precio_Unitario_Moneda_Base
      Precio_Unitario_Moneda_de_Venta
      Equivalencia_de_la_moneda_del_producto_vs_base
      Porcentaje_de_Descuento_de_Linea_1
      Valor_de_Descuento_de_Linea_1
      Porcentaje_de_Descuento_de_Linea_2
      Valor_de_Descuento_de_Linea_2
      Porcentaje_de_Descuento_de_Linea_3
      Valor_de_Descuento_de_Linea_3
      Porcentaje_de_Descuento_de_Linea_4
      Valor_de_Descuento_de_Linea_4
      Porcentaje_de_Descuento_de_Linea_5
      Valor_de_Descuento_de_Linea_5
      Valor_Total_Descuentos_de_Linea
      Porcentaje_de_credito_Empresas_Constructoras
      Valor_Total_de_Credito_Empresas_Constructoras
      Partida_o_Talla
      Pieza_o_Color
      Fecha_de_Vencimiento_de_la_Partida_o_Pieza
      Serie
      Numero_Nota_de_Venta
      Identificador_Impresora_Fiscal
      Conserva_Folio_Asignado_al_DTE
      Referencia_1_Tipo_Documento_SII
      Referencia_1_Descripcion
      Referencia_1_Numero_Documento
      Referencia_1_Fecha_Documento
      Referencia_1_Codigo_Referencia_Boleta
      Referencia_2_Tipo_Documento_SII
      Referencia_2_Descripcion
      Referencia_2_Numero_Documento
      Referencia_2_Fecha_Documento
      Referencia_2_Codigo_Referencia_Boleta
      Referencia_3_Tipo_Documento_SII
      Referencia_3_Descripcion
      Referencia_3_Numero_Documento
      Referencia_3_Fecha_Documento
      Referencia_3_Codigo_Referencia_Boleta
      Referencia_4_Tipo_Documento_SII
      Referencia_4_Descripcion
      Referencia_4_Numero_Documento
      Referencia_4_Fecha_Documento
      Referencia_4_Codigo_Referencia_Boleta
      Referencia_5_Tipo_Documento_SII
      Referencia_5_Descripcion
      Referencia_5_Numero_Documento
      Referencia_5_Fecha_Documento
      Referencia_5_Codigo_Referencia_Boleta
      Tipo_de_Transaccion
      Forma_Pago_SII
      ExportacionIndicador_de_Servicio
      ExportacionForma_de_Pago_Exportacion
      ExportacionIdAdicional_Receptor_Extranjero
      ExportacionRut_Chofer
      ExportacionNombre_Chofer
      ExportacionModalidad_de_Venta
      ExportacionClausula_de_Exportacion
      ExportacionTotal_Clausula_de_Ventas_Exportacion
      ExportacionRecargo_sTotal_Clausula_de_Venta
      ExportacionVia_de_Transporte
      ExportacionIddel_Medio_de_Transporte
      ExportacionRut_Compania_Transportista
      ExportacionNombre_Compania_Transportadora
      ExportacionIdAdicional_Cia_Transportadora
      ExportacionBooking
      ExportacionMotoNave
      ExportacionCodigo_de_Operador
      ExportacionPuerto_de_Embarque
      ExportacionIdAdicional_Puerto_de_Embarque
      ExportacionPuerto_de_Desembarque
      ExportacionIdAdicional_Puerto_de_Desembarque
      ExportacionTara
      ExportacionUnidad_de_Medida_Tara
      ExportacionTotal_Peso_Bruto
      ExportacionUnidad_Peso_Bruto
      ExportacionTotal_Peso_Neto
      ExportacionUnidad_Peso_Neto
      ExportacionTotal_Items
      ExportacionTotal_Bultos
      ExportacionTipo_de_Bulto
      ExportacionMarca
      ExportacionId_Container
      ExportacionSello
      ExportacionEmisor_Sello
      ExportacionFlete
      ExportacionSeguro
      ExportacionCodigo_Pais_Receptor
      ExportacionTipo_Moneda_Transaccion
    }
  }
`;

export const GET_SOFTLAND_REPORTS = gql`
  query GetSoftlandReport {
    getAllSoftlandReport {
      dateIni
      dateEnd
      affectionNumber
      exemptNumber
      createdAt
    }
  }
`;
