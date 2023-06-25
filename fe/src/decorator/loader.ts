import loader from "../store/loader";

const loaderStore = loader();

export default function (_: any, __: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = async function (...args: any[]) {
    loaderStore.setLoading(true);
    // @ts-ignore
    const result = await originalMethod.apply(this, args);
    loaderStore.setLoading(false);
    return result;
  };

  return descriptor;
}
