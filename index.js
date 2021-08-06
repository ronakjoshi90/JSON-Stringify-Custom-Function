function stringify(obj) {
  if (typeof obj !== 'object' || obj === null || obj instanceof Array) {
    return value(obj);
  }

  return (
    '{' +
    Object.keys(obj)
      .map(function(k) {
        return typeof obj[k] === 'function'
          ? null
          : '"' + k + '":' + value(obj[k]);
      })
      .filter(function(i) {
        console.log(i);
        return i;
      }) +
    '}'
  );
}

function value(val) {
  switch (typeof val) {
    case 'string':
      return '"' + val.replace(/\\/g, '\\\\').replace('"', '\\"') + '"';
    case 'number':
    case 'boolean':
      return '' + val;
    case 'function':
      return 'null';
    case 'object':
      if (val instanceof Date) return '"' + val.toISOString() + '"';
      if (val instanceof Array) return '[' + val.map(value).join(',') + ']';
      if (val === null) return 'null';
      return stringify(val);
  }
}

console.log(
  stringify({
    name: 'andrew',
    age: 24,
    married: false,
    single: true,
    date: new Date()
  })
);
