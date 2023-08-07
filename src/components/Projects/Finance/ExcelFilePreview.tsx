import FilePreview from "../FilePreview";

interface ExcelFilePreviewProps {
  label: string;
  filePath: string;
}

const ExcelFilePreview = ({ label, filePath }: ExcelFilePreviewProps) => (
  <FilePreview label={label} filePath={filePath} previewImgPath="/projects/excel.png" width={165} height={165} addBg />
);

export default ExcelFilePreview;
