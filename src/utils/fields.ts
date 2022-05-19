export const userFormFields: LooseObject = {
  name: {
    registerProps: {
      maxLength: 100,
      minLength: 3,
    },
    inputProps: {
      label: 'Nombre',
      type: 'text',
      placeholder: 'Nombre',
    },
  },
  lastName: {
    registerProps: {
      maxLength: 100,
      minLength: 3,
    },
    inputProps: {
      label: 'Primer apellido',
      type: 'text',
      placeholder: 'Primer apellido',
    },
  },
  secondLastName: {
    registerProps: {
      maxLength: 100,
      minLength: 3,
    },
    inputProps: {
      label: 'Segundo apellido',
      type: 'text',
      placeholder: 'Segundo apellido',
    },
  },
  gender: {
    registerProps: {},
    inputProps: {
      label: 'Sexo',
      placeholder: 'Selecciona una opcion',
      options: [
        { label: 'Masculino', value: 'masculino' },
        { label: 'Femenino', value: 'femenino' },
        { label: 'Intersex', value: 'intersex' },
      ],
    },
  },
  birthdate: {
    registerProps: {},
    inputProps: {
      label: 'Fecha de nacimiento',
      type: 'text',
      placeholder: 'DD/MM/AAAA',
      mask: ['', '', '', '', '', '', '', ''],
    },
  },
  documentType: {
    registerProps: {},
    inputProps: {
      label: 'Tipo de documento',
      helpText: '*Reembolsos solo con RUT.',
    },
    conditions: ['Rut', 'Pasaporte'],
  },
  rut: {
    registerProps: {},
    inputProps: {
      label: 'Rut',
      type: 'text',
      placeholder: '12.345.678-9',
    },
  },
  passport: {
    registerProps: {},
    inputProps: {
      label: 'Pasaporte',
      type: 'text',
      placeholder: 'ABC123456',
    },
  },
  email: {
    registerProps: {},
    inputProps: {
      label: 'Email',
      type: 'email',
      placeholder: 'ejemplo@ejemplo.com',
    },
  },
  phone: {
    registerProps: {},
    inputProps: {
      label: 'Telefono',
      type: 'text',
      placeholder: '+56 9 1234 5678',
      format: '+56 9 #### ####',
      mask: ['', '', '', '', '', '', '', ''],
    },
  },
  date: {
    registerProps: {},
    inputProps: {
      label: 'Fecha Agendada',
      type: 'date',
    },
  },
  start: {
    registerProps: {},
    inputProps: {
      label: 'Hora inicial',
      type: 'time',
    },
  },
  end: {
    registerProps: {},
    inputProps: {
      label: 'Hora final',
      type: 'time',
    },
  },
  address: {
    registerProps: {},
    inputProps: {
      placeholder: 'Av. Salvador',
      label: 'Calle',
      type: 'text',
    },
  },
  addressNumber: {
    inputProps: {
      label: 'Número',
      placeholder: '149',
      type: 'number',
    },
    registerProps: {},
  },
  addressDetail: {
    registerProps: {},
    inputProps: {
      label: 'Indicaciones Extra',
      placeholder: 'Ej: Oficina 9, Piso 4, Pasaje, Casa 2.',
      type: 'text',
    },
  },
};

export const provinceFields = {
  stateName: {
    registerProps: {},
    inputProps: {
      label: 'Comuna',
    },
  },
  province: {
    registerProps: {},
    inputProps: {
      label: 'Region',
    },
  },
};
