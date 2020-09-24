import React from 'react';
import { Table } from 'react-bootstrap';

interface Props {
  data: GongdbInputData[]
  onRowClick: (index: number) => void
  onRowDoubleClick: (index: number) => void
}

const ellipsis = {
  textOverflow: "ellipsis" as const,
  overflow: "hidden" as const,
  whiteSpace: "nowrap" as const,
};

const DataTable = (props: Props) => {
  return (
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th>#</th>
          <th>회사명</th>
          <th>공고연도</th>
          <th>차수</th>
          <th>어학</th>
          <th>어학만점</th>
          <th>링크</th>
          <th>직군</th>
          <th>근무형태</th>
          <th>채용구분</th>
          <th>지역</th>
          <th>채용수준</th>
          <th>직급</th>
          <th>과목</th>
          <th>자격증</th>
          <th>학과</th>
          <th>공고별 기타사항</th>
          <th>NCS</th>
          <th>둘중하나</th>
          <th>메모</th>
        </tr>
      </thead>
      <tbody>
        {
          props.data.map((value, index) => (
            <tr 
              key={index} 
              data-key={index} 
            >
              <td 
                onClick={() => props.onRowClick(index)}
              >
                {index+1}
              </td>
              <td 
                onDoubleClick={() => props.onRowDoubleClick(index)}
                style={{maxWidth: 200, ...ellipsis}}
              >
                {value.companyName}
              </td>
              <td style={{maxWidth: 100, ...ellipsis}}>{value.announcementTimestamp}</td>
              <td style={{maxWidth: 100, ...ellipsis}}>{value.sequence}</td>
              <td style={{maxWidth: 100, ...ellipsis}}>{value.languageScore}</td>
              <td style={{maxWidth: 100, ...ellipsis}}>{value.perfectLanguageScore}</td>
              <td style={{maxWidth: 150, ...ellipsis}}>{value.link}</td>
              <td style={{maxWidth: 100, ...ellipsis}}>{value.position}</td>
              <td style={{maxWidth: 150, ...ellipsis}}>{value.workingType}</td>
              <td style={{maxWidth: 150, ...ellipsis}}>{value.recruitType}</td>
              <td style={{maxWidth: 300, ...ellipsis}}>{value.districts}</td>
              <td style={{maxWidth: 100, ...ellipsis}}>{value.recruitLevel}</td>
              <td style={{maxWidth: 100, ...ellipsis}}>{value.rank}</td>
              <td style={{maxWidth: 400, ...ellipsis}}>{value.subjects}</td>
              <td style={{maxWidth: 400, ...ellipsis}}>{value.certificates}</td>
              <td style={{maxWidth: 400, ...ellipsis}}>{value.departments}</td>
              <td style={{maxWidth: 300, ...ellipsis}}>{value.annnouncementEtc}</td>
              <td style={{maxWidth: 400, ...ellipsis}}>{String(value.ncs)}</td>
              <td style={{maxWidth: 50, ...ellipsis}}>{typeof value.isEither === "boolean" ? String(value.isEither) : ""}</td>
              <td style={{maxWidth: 200, ...ellipsis}}>{value.memo}</td>
            </tr>
          )).reverse()
        }
      </tbody>
    </Table>
  );
};

export default DataTable;