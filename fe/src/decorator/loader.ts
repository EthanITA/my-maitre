import loader from "../store/loader";

const loaderStore = loader();

export default function (_: any, __: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = async function (...args: any[]) {
    try {
      loaderStore.setLoading(true);
      // @ts-ignore
      return await originalMethod.apply(this, args);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      loaderStore.setLoading(false);
    }
  };

  return descriptor;
}
