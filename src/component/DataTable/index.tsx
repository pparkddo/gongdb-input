import React from 'react';
import { Table } from 'react-bootstrap';

interface Props {
  data: GongdbInputData[]
  onRowClick: (index: number) => void
  onRowDoubleClick: (index: number) => void
}

const DataTable = (props: Props) => {
  return (
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th>#</th>
          <th style={{minWidth: 200}}>회사명</th>
          <th style={{minWidth: 200}}>공고연도</th>
          <th style={{minWidth: 150}}>차수</th>
          <th style={{minWidth: 150}}>어학</th>
          <th style={{minWidth: 150}}>어학만점</th>
          <th style={{minWidth: 500}}>링크</th>
          <th style={{minWidth: 150}}>직군</th>
          <th style={{minWidth: 150}}>근무형태</th>
          <th style={{minWidth: 150}}>채용구분</th>
          <th style={{minWidth: 500}}>지역</th>
          <th style={{minWidth: 150}}>채용수준</th>
          <th style={{minWidth: 150}}>직급</th>
          <th style={{minWidth: 500}}>과목</th>
          <th style={{minWidth: 500}}>자격증</th>
          <th style={{minWidth: 500}}>학과</th>
          <th style={{minWidth: 500}}>공고별 기타사항</th>
          <th style={{minWidth: 500}}>NCS</th>
          <th style={{minWidth: 50}}>둘중하나</th>
        </tr>
      </thead>
      <tbody>
        {
          props.data.map((value, index) => (
            <tr 
              key={index} 
              data-key={index} 
            >
              <td onClick={() => props.onRowClick(index)}>{index+1}</td>
              <td onDoubleClick={() => props.onRowDoubleClick(index)}>{value.companyName}</td>
              <td>{value.announcementTimestamp}</td>
              <td>{value.sequence}</td>
              <td>{value.languageScore}</td>
              <td>{value.perfectLanguageScore}</td>
              <td>{value.link}</td>
              <td>{value.position}</td>
              <td>{value.workingType}</td>
              <td>{value.recruitType}</td>
              <td>{value.districts}</td>
              <td>{value.recruitLevel}</td>
              <td>{value.rank}</td>
              <td>{value.subjects}</td>
              <td>{value.certificates}</td>
              <td>{value.departments}</td>
              <td>{value.annnouncementEtc}</td>
              <td>{String(value.ncs)}</td>
              <td>{typeof value.isEither === "boolean" ? String(value.isEither) : ""}</td>
            </tr>
          )).reverse()
        }
      </tbody>
    </Table>
  );
};

export default DataTable;