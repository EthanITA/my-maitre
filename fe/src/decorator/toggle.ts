/**
 * @description
 * This decorator is used to toggle a value of a class instance.
 * It's useful when you need to change temporarily a value of a class instance
 * and then restore it to the original value.
 * @param key the field of the class instance
 * @param value the value to set
 */

export default (key, value) =>
  function (_: any, __: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const originalValue = this[key];
      try {
        this[key] = value;
        // @ts-ignore
        return await originalMethod.apply(this, args);
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        this[key] = originalValue;
      }
    };

    return descriptor;
  };
