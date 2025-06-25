export default function GenericPage(props: { title: string, description: string }) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-dark-blue mb-6">{props.title}</h1>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <p className="text-black">{props.description}</p>
        </div>
      </div>
    );
  } 