import { ErrorOutline } from "@mui/icons-material";

interface PageParams {
  name: string;
  description?: string | null;
}

export const renderErrorState = (props: PageParams) => {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full">
        <ErrorOutline
          sx={{
            fontSize: 80,
            color: "#ff6b95",
            marginBottom: "24px",
            display: "block",
            margin: "0 auto",
          }}
        />

        <h1 className="text-3xl font-bold text-gray-800 mb-4">{props.name}</h1>

        {props.description && (
          <p className="text-gray-600 mb-8">{props.description}</p>
        )}
      </div>
    </div>
  );
};
